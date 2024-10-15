/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { utils, writeFile } from 'xlsx';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import { FundraiserTypes } from '../../../../models/LumiFundraising/enums';
import AthleteService from '../../../../services/LumiFundraising/AthleteService';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import {
  CenterEverything,
  InheritingLink,
  PaddingDiv,
  SideLinkArea,
  StyledHeader,
  StyledHr,
  StyledRow,
  StyledTable,
  TopBar
} from '../../../../styles/SharedStyles';
import AddAthleteForm from '../../../../views/LumiFundraising/Forms/AddAthleteForm';
import AthleteRow from '../../../../views/LumiFundraising/Rows/AthleteRow';
import StyledContainer from '../../../../views/StyledContainer';
import ToolTip from '../../../../views/ToolTip';
import FormPopUpWindow from '../../../../views/popups/FormPopUpWindow';
import { dynamicSort } from '../../../../util/utils';
import Donation from '../../../../models/LumiFundraising/Donation';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import BackButton from '../../../../views/BackButton';

const SampleMessage = styled.div`
  display: inline-block;
  float: right;
  padding: 25px;
  width: 45%;
  align-items: right;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

const StyledTableArea = styled(CenterEverything)`
  margin-top: 220px;
`;

const AthleteView: NextPage = () => {
  const fundraiserService = new FundraiserService();
  const athleteService = new AthleteService();
  const donationService = new DonationService();
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  let data = router.query;
  let fundraiserId: string = getFundraiserId(data.fundraiserId);
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [sortByAmount, setSortByAmount] = useState<boolean>(false);

  /**
   * var for error popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const togglePopUp = () => setShowPopUP(!showPopUP);
  const [errorMessage, setErrorMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [windowOpenFlag, setWindowOpenFlag] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedForFile, setLoadedForFile] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [percentageParticipation, setPercentageParticipation] =
    useState<number>(0);
  const [participatingAthletes, setParticipatingAthletes] = useState<number>(0);
  const [totalAthletes, setTotalAthletes] = useState<number>(0);

  const [showStudentRaffle, setShowStudentRaffle] = useState<boolean>(false);

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      fundraiserId = getFundraiserId(data.fundraiserId);
      if (fundraiserId) {
        if (!dataFetchedRef.current) {
          getFundraiser();
        }
        dataFetchedRef.current = true;
      }
    }
  }, [router]);

  //when fundraiser is updated, refetch athletes
  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    refreshAthletes();
  }, [refresh]);

  async function getFundraiser() {
    //get fund
    const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
    if (fund) {
      setFundraiser(fund);
      getDonations(fund.id);
    }
  }

  async function refreshAthletes() {
    if (fundraiserId) {
      getDonations(fundraiserId);
    }
  }

  async function getDonations(fundraiserId: string | undefined): Promise<void> {
    if (fundraiserId) {
      let [donationsLocal, error] =
        await donationService.getDonationsByFundraiser(fundraiserId);
      if (error.length > 0) {
        console.error(error);
      }
      setDonations(donationsLocal);
      getAthletesAsync(fundraiserId, donationsLocal);
    }
  }

  async function getAthletesAsync(fundraiserId: string, donationsLocal: Donation[]) {
    setLoaded(false);
    let [fundAthletes, error] =
      await athleteService.getAthletesByFundraiserId(fundraiserId);
    let sorted = fundAthletes.sort(dynamicSort('name'));
    if (sortByAmount) {
      sorted = await sortAthletesByAmount(fundAthletes);
    }
    setAthletes(sorted);
    calculateParticipation(sorted, donationsLocal);
    setLoaded(true);
  }

  async function sortAthletesByAmount(fundAthletes: Athlete[]) {
    setLoadedForFile(false);
    let byValue = fundAthletes.map(athlete => {
      const athleteDonations = donations.filter(
        donation => donation.athleteId === athlete.userId
      );
      athlete.donationValue = athleteDonations.reduce(
        (n, { amount }) => n + amount,
        0
      );
      return athlete;
    });
    let sort = byValue.sort(dynamicSort('donationValue'));
    setLoadedForFile(true);
    return sort;
  }

  function calculateParticipation(fundAthletes: Athlete[], donationsLocal: Donation[]) {
    setTotalAthletes(fundAthletes.length);
    let fundedAthletes = 0;
    fundAthletes.forEach(async athlete => {
      const athleteHasDonation = donationsLocal.find(
        donation => donation.athleteId === athlete.userId
      );
      if (athleteHasDonation) {
        fundedAthletes++;
      }
    });
    setParticipatingAthletes(fundedAthletes);
    setPercentageParticipation(getParticipation(fundedAthletes, fundAthletes));
  }

  async function downloadFile() {
    const rows = athletes.map(athlete => ({
      name: athlete.name,
      id: athlete.userId
    }));

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [['Name', 'ID', '', 'FundraiserId=' + fundraiserId]],
      { origin: 'A1' }
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, 'AthleteIds.xlsx');
  }

  async function downloadFileWithDonations() {
    let sorted;
    if (loaded && sortByAmount) {
      sorted = athletes;
    } else {
      sorted = await sortAthletesByAmount(athletes);
    }
    const rows = sorted.map(athlete => ({
      name: athlete.name,
      id: athlete.userId,
      amount: athlete.donationValue
    }));

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [['Name', 'ID', 'Amount Raised', '', 'FundraiserId=' + fundraiserId]],
      { origin: 'A1' }
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, 'AthleteDonations.xlsx');
  }

  /**
   * Trims down routing var to Id
   * @param id
   */
  function getFundraiserId(id: string | string[] | undefined) {
    return typeof id == 'string' ? id : '';
  }

  async function onSubmit(fields: any) {
    let name: string = fields.target.nameInput.value;

    //check if they did individual, or are using the file
    if (name && name.length > 0) {
      let athlete = new Athlete(
        name,
        fundraiserId,
        fundraiser?.athleteGoal ?? 0
      );

      let error = await athleteService.createAthlete(athlete, fundraiserId);
      if (error) {
        console.error('Error adding Athlete');
        console.error(error);
        setErrorMessage(error);
        togglePopUp();
      }
    }
    setRefresh(true);
  }

  async function updateMessage(fields: any) {
    let message = fields.target.messageInput?.value;
    if (fundraiser) {
      fundraiser.requestMessage = message;
      fundraiserService.updateFundraiser(fundraiser);
    }
  }

  function getParticipation(
    fundedAthletes: number,
    fundAthletes: Athlete[]
  ): number {
    if (fundAthletes.length > 0) {
      return Math.round((fundedAthletes / fundAthletes.length) * 100);
    }
    return 0;
  }

  return (
    <StyledContainer>
      <BackButton router={router}>Return to Fundraisers</BackButton>
      <CenterEverything>
        <Title>{fundraiser?.name ?? 'Fundraiser Name'}</Title>
        <TopBar>
          <h1>
            {fundraiserService.getAmountCollectedByDonations(donations) ??
              '000.00'}
            /{fundraiser?.overallGoal ?? '000.00'}
          </h1>
        </TopBar>
      </CenterEverything>
      <StyledHr />
      <SampleMessage>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateMessage(e);
          }}
        >
          <b>Sample message for athletes to use: </b>
          <textarea
            className={'input'}
            id="messageInput"
            defaultValue={fundraiser?.requestMessage}
            required
          />
          <button>{'>'}</button>
        </form>
      </SampleMessage>
      <SideLinkArea>
        {fundraiserId && (
          <PaddingDiv>
            <Button variant="dark">
              <InheritingLink
                href={{
                  pathname: `/LumiFundraising/fundraisers/${fundraiserId}/liveView`
                }}
              >
                Live View
              </InheritingLink>
            </Button>
          </PaddingDiv>
        )}
        <PaddingDiv>
          <Button variant="dark" onClick={downloadFile}>
            <b>Download Athlete Numbers</b>
          </Button>
        </PaddingDiv>

        <PaddingDiv>
          {loadedForFile && loaded ? (
            <Button variant="dark" onClick={downloadFileWithDonations}>
              <b>Download Athlete WIth Donations</b>
            </Button>
          ) : (
            <Spinner animation="border" />
          )}
        </PaddingDiv>

        {fundraiserId &&
          !!((fundraiser?.type ?? 0) & FundraiserTypes.Raffle) && (
            <PaddingDiv>
              <Button variant="dark">
                <InheritingLink
                  href={{
                    pathname: `/LumiFundraising/fundraisers/${fundraiserId}/raffle`
                  }}
                >
                  Raffle
                </InheritingLink>
              </Button>
            </PaddingDiv>
          )}

        {fundraiserId &&
          !!((fundraiser?.type ?? 0) & FundraiserTypes.StudentRaffle) && (
            <PaddingDiv>
              <Button variant="dark">
                <InheritingLink
                  href={{
                    pathname: `/LumiFundraising/fundraisers/${fundraiserId}/studentRaffle`
                  }}
                >
                  Student Raffle
                </InheritingLink>
              </Button>
            </PaddingDiv>
          )}
      </SideLinkArea>

      {/* Table */}
      {athletes ? (
        <StyledTableArea>
          <p>
            Participation: {percentageParticipation}% - {participatingAthletes}/
            {totalAthletes}
          </p>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Sort By Completion"
            onClick={() => {
              setRefresh(true);
              setSortByAmount(!sortByAmount);
            }}
          />
          {loaded ? (
            <StyledTable>
              <tbody>
                <tr>
                  <StyledHeader>Name</StyledHeader>
                  <StyledHeader>Id</StyledHeader>
                  <StyledHeader>$</StyledHeader>
                  <StyledHeader>%</StyledHeader>
                  <StyledHeader>
                    Add Cash Donation
                    <ToolTip message="If an athlete gets a cash or check donation, you can add it to their profile here." />
                  </StyledHeader>
                  <StyledHeader></StyledHeader>
                </tr>
                {athletes.map(athlete => (
                  <AthleteRow
                    key={athlete.userId}
                    athlete={athlete}
                    athleteDonationMap={athleteService.sortDonationsToAthletes(
                      athletes,
                      donations
                    )}
                    athleteService={athleteService}
                    donationService={donationService}
                    fundraiserService={fundraiserService}
                    fundraiser={fundraiser}
                    setRefresh={setRefresh}
                    sortByAmount={sortByAmount}
                  />
                ))}
                {fundraiser && (
                  <StyledRow>
                    <td>
                      {/* Add Athlete row */}
                      <FormPopUpWindow
                        title="Add Athlete"
                        buttonName="Add Athlete"
                        windowOpen={windowOpenFlag}
                        setWindowOpenFlag={setWindowOpenFlag}
                      >
                        <AddAthleteForm
                          setWindowOpenFlag={setWindowOpenFlag}
                          submit={onSubmit}
                          fundraiser={fundraiser}
                          athleteService={athleteService}
                          setRefresh={setRefresh}
                        />
                      </FormPopUpWindow>
                    </td>
                  </StyledRow>
                )}
              </tbody>
            </StyledTable>
          ) : (
            <Spinner animation="border" />
          )}
        </StyledTableArea>
      ) : (
        <Spinner animation="border" />
      )}
    </StyledContainer>
  );
};

export default AthleteView;
