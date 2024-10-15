/* eslint-disable react-hooks/exhaustive-deps */
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Donation from '../../../../models/LumiFundraising/Donation';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import RaffleProperties from '../../../../models/LumiFundraising/TypeProperties/RaffleProperties';
import { FundraiserTypes } from '../../../../models/LumiFundraising/enums';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import localStyles from '../../../../styles/LumiFundraising/pages/athlete.module.css';
import {
  Center,
  PaddingDiv,
  SideLinkArea,
  Spacing,
  StyledHeader,
  StyledRow,
  TopBar
} from '../../../../styles/SharedStyles';
import { utils, writeFile } from 'xlsx';
import StyledContainer from '../../../../views/StyledContainer';
import FormPopUpWindow from '../../../../views/popups/FormPopUpWindow';
import VerifyPopUpWindow from '../../../../views/popups/VerifyPopUpWindow';
import { Button } from 'react-bootstrap';
import PackedDonation from '../../../../models/LumiFundraising/PackedDonation';
import RafflePropertiesForm from '../../../../views/LumiFundraising/Forms/RafflePropertiesForm';
import RaffleDrawForm from '../../../../views/LumiFundraising/Forms/RaffleDrawForm';
import BackButton from '../../../../views/BackButton';

const StyledTable = styled(MDBTable)``;

const Raffle: NextPage = () => {
  const donationService = new DonationService();
  const fundraiserService = new FundraiserService();
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  let data = router.query;
  let fundraiserId = data.fundraiserId;
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [donations, setDonations] = useState<PackedDonation[]>([]);
  const [fundProperties, setFundProperties] = useState<
    RaffleProperties | undefined
  >(undefined);
  const [windowOpenFlag, setWindowOpenFlag] = useState(false);
  const [windowOpenFlagDraw, setWindowOpenFlagDraw] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      if (data.fundraiserId) {
        if (!dataFetchedRef.current) {
          getData();
        }
        dataFetchedRef.current = true;
      }
    }
  }, [router]);

  async function getData() {
    if (fundraiserId && typeof fundraiserId === 'string') {
      const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
      if (fund) {
        setFundraiser(fund);
        setFundProperties(
          fundraiserService.getRaffleProperties(fund.typeProperties)
        );
        getDonationsCondensed(fund?.id);
      }
    }
  }

  //when fundraiser is updated, refetch athletes
  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    getData();
  }, [refresh]);

  async function getDonationsCondensed(
    fundraiserId: string | undefined
  ): Promise<void> {
    if (fundraiserId) {
      let donations = await donationService.getPackedDonationsCondensed(fundraiserId);
      //sort by date amd time
      donations.sort((a, b) => {
        return new Date(b.received).valueOf() - new Date(a.received).valueOf();
      });
      console.log(donations);
      setDonations(donations);
    }
  }

  function calculateTickets(donation: Donation) {
    if (fundProperties && fundProperties?.pricePerTicket) {
      let bonus = 0;
      if (fundProperties.coverExtraTicket && donation.bonusTicket) {
        bonus = 1;
      }
      return (
        Math.floor(donation.amount / fundProperties.pricePerTicket) + bonus
      );
    }
    return 0;
  }

  async function onSubmit(fields: any) {
    let price: number = Number(fields.target.priceInput.value);
    let extraTicket: boolean = fields.target.extraTicketInput.checked;
    let first: number = Number(fields.target.firstInput.value);
    let second: number = Number(fields.target.secondInput.value);
    let third: number = Number(fields.target.thirdInput.value);

    let prizes: number[] = [first];
    if (second && second > 0) {
      prizes.push(second);
    }
    if (third && third > 0) {
      prizes.push(third);
    }

    let props: RaffleProperties = new RaffleProperties(
      price,
      prizes,
      extraTicket
    );
    if (fundraiser) {
      let updatedFund = prepareFundForProperties(fundraiser);
      updatedFund.typeProperties.push(props);
      let updateError = await fundraiserService.updateFundraiser(updatedFund);
      if (updateError && updateError.length > 0) {
        console.error('Error updating fundraiser');
      } else {
        setRefresh(true);
      }
    }
  }

  async function onSubmitDraw(winners: string[]) {
    if (fundraiser) {
      //get Full donations from winners ids
      const [donations, error] = await donationService.getPackedDonationsByIds(
        winners
      );
      //get the raffle properties to update
      let raffleProps = fundraiserService.getRaffleProperties(
        fundraiser.typeProperties
      );
      if (raffleProps) {
        //prep types
        raffleProps.winners = donations;
        let updatedFund = prepareFundForProperties(fundraiser);
        //update fundraiser
        updatedFund.typeProperties.push(raffleProps);
        let updateError = await fundraiserService.updateFundraiser(updatedFund);
        setRefresh(true);
        if (updateError && updateError.length > 0) {
          console.error('Error updating fundraiser');
        }
      }
    }
  }

  function prepareFundForProperties(fund: Fundraiser): Fundraiser {
    if (!fund.typeProperties) {
      fund.typeProperties = [];
    }
    let foundIndex = fund.typeProperties.findIndex(prop => {
      return prop.type === FundraiserTypes.Raffle;
    });
    if (foundIndex !== -1) {
      fund.typeProperties.splice(foundIndex, 1);
    }
    return fund;
  }

  async function downloadFile() {
    let rows: any[] = [];
    donations.map(donation => {
      const numberTickets = calculateTickets(donation);
      for (let i = 0; i < numberTickets; i++) {
        rows.push({
          name: donation.donator,
          athlete: donation.athleteName,
          email: donation.donator.email
        });
      }
    });

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    utils.sheet_add_aoa(worksheet, [['Name', 'Athlete', 'Email']], {
      origin: 'A1'
    });

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];

    writeFile(workbook, 'Raffle.xlsx');
  }

  return (
    <StyledContainer>
      <BackButton router={router}>Return to Fundraiser</BackButton>
      <Center>
        <h1>{fundraiser?.name ?? 'Fundraiser Name'} - Raffle</h1>
        <TopBar>{/* TODO//set the places */}</TopBar>
      </Center>
      <SideLinkArea>
        <PaddingDiv>
          {fundraiser && (
            <PaddingDiv>
              <FormPopUpWindow
                title="Set Up Raffle"
                buttonName="Set up Raffle"
                windowOpen={windowOpenFlag}
                setWindowOpenFlag={setWindowOpenFlag}
                buttonStyle={'dark'}
                redBorder={fundProperties === undefined}
              >
                <RafflePropertiesForm
                  setWindowOpenFlag={setWindowOpenFlag}
                  submit={onSubmit}
                  fundraiser={fundraiser}
                />
              </FormPopUpWindow>
            </PaddingDiv>
          )}
        </PaddingDiv>

        {fundProperties && fundraiser && (
          <PaddingDiv>
            <FormPopUpWindow
              title="Draw Raffle"
              buttonName="Draw Raffle"
              windowOpen={windowOpenFlagDraw}
              setWindowOpenFlag={setWindowOpenFlagDraw}
              buttonStyle={'dark'}
            >
              <RaffleDrawForm
                setWindowOpenFlag={setWindowOpenFlagDraw}
                submit={onSubmitDraw}
                fundraiser={fundraiser}
                donationsCondensed={donations}
              />
            </FormPopUpWindow>
          </PaddingDiv>
        )}
        {fundProperties && fundProperties.winners?.length > 0 && (
          <PaddingDiv>
            <VerifyPopUpWindow
              title="Raffle Winners"
              buttonName="See Winners Information"
              buttonStyle="dark"
              submitButtonName="Woot"
              buttonClick={() => []}
            >
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledHeader>Place</StyledHeader>
                    <StyledHeader>Name</StyledHeader>
                    <StyledHeader>Athlete</StyledHeader>
                    <StyledHeader>Email</StyledHeader>
                  </tr>
                  {fundProperties.winners.map((winner, index) => {
                    return (
                      <tr key={index}>
                        <StyledRow>{index + 1}</StyledRow>
                        <StyledRow>{winner.donator.name}</StyledRow>
                        <StyledRow>
                          {winner.athleteName}
                        </StyledRow>
                        <StyledRow>{winner.donator.email}</StyledRow>
                      </tr>
                    );
                  })}
                </tbody>
              </StyledTable>
            </VerifyPopUpWindow>
          </PaddingDiv>
        )}
        {fundProperties && fundraiser && donations.length > 0 && (
          <PaddingDiv>
            <Button variant="dark" onClick={downloadFile}>
                  Download Tickets
                </Button>
          </PaddingDiv>
        )}
      </SideLinkArea>
      <Spacing />
      <MDBTable className="table table-striped">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Donator</th>
            <th scope="col">Athlete</th>
            <th scope="col">Amount</th>
            <th scope="col">Tickets</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {donations.map((donation: PackedDonation, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{donation.donator.name}</td>
                <td>{donation.athleteName}</td>
                <td>{donation.amount}</td>
                <td>{calculateTickets(donation)}</td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </StyledContainer>
  );
};

export default Raffle;
