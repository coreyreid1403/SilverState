import {
  MDBProgress,
  MDBProgressBar,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdb-react-ui-kit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import AthleteService from '../../../../services/LumiFundraising/AthleteService';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import localStyles from '../../../../styles/LumiFundraising/pages/athlete.module.css';
import {
  CardContent,
  CardHeader,
  GridStyle,
  HalfCard,
  MediumSpacing,
  Spacing,
  TopBar
} from '../../../../styles/SharedStyles';
import DonationConstants from '../../../../util/LumiFundraising/DonationConstants';
import StyledContainer from '../../../../views/StyledContainer';
import ToolTip from '../../../../views/ToolTip';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import DonatorService from '../../../../services/LumiFundraising/DonatorService';
import PackedDonation from '../../../../models/LumiFundraising/PackedDonation';
//TODO: remove the folder var, then we can remove the fetch in the links
const StyledTable = styled(MDBTable)`
  width: 50%;
  padding: 10px;
  margin: auto;
`;

const UpdateGoal = styled.div`
  display: inline-block;
  float: right;
  padding: 25px;
`;

const StyledButton = styled.button`
  margin-left: 5px;
`;

const CenterStyledMain = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  z-index: 9;
`;

const AthletesPage: NextPage = () => {
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  const data = router.query;
  const athleteService = new AthleteService();
  const fundraiserService = new FundraiserService();
  const donationService = new DonationService();
  const athleteId = data.athlete;
  const fundraiserId = data.fundraiser;
  let donationNumber = 0;
  let failedDonationNumber = 0;

  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined);
  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [donationLink, setDonationLink] = useState<string>('');
  const [donationValue, setDonationValue] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState('0');
  const [donations, setDonations] = useState<PackedDonation[]>([]);
  const [failedDonations, setFailedDonations] = useState<PackedDonation[]>([]);

  useEffect(() => {
    if (router && router.query) {
      refreshDonations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getAthleteInfo = async (athleteId: string, fundraiserId: string) => {
    //set donation link
    setDonationLink(
      DonationConstants.baseURL +
      '/LumiFundraising/donate?fundraiserId=' +
      fundraiserId +
      '&athleteId=' +
      athleteId
    );

    //get fundraiser
    const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
    if (fund && error.length === 0) {
      setFundraiser(fund);
    }

    //get athlete
    const [athleteLocal, error2] = await athleteService.getAthlete(
      athleteId,
      fundraiserId
    );
    if (athleteLocal && error2.length === 0) {
      setAthlete(athleteLocal);
      //set donations list
      let [donationsLocal, error3] = await donationService.getPackedDonationsByAthlete(
        athleteId
      );
      if (donationsLocal && error3.length === 0) {
        setDonations(donationsLocal);
        //get total donations total
        const donationsValueLocal: number =
          await athleteService.getDonationsValueFromDonations(donationsLocal);
        setDonationValue(donationsValueLocal);
        //get goal completion %
        const completionPercentage =
          await athleteService.getPercentageCompleteWithValue(
            athleteLocal,
            donationsValueLocal
          );
        setPercentageComplete(completionPercentage);
      }
      //set donations list
      let [failedDonationsLocal] = await donationService.getFailedPackedDonationsByAthlete(
        athleteId
      );
      if (failedDonationsLocal) {
        setFailedDonations(failedDonationsLocal);
      }
    }
  };

  function refreshDonations() {
    if (
      athleteId &&
      typeof athleteId === 'string' &&
      fundraiserId &&
      typeof fundraiserId === 'string'
    ) {
      getAthleteInfo(athleteId, fundraiserId);
    }
  }

  async function updateGoal(fields: any) {
    let goal = fields.target.goalInput?.value;
    if (athlete) {
      athlete.fundraiserAthleteGoal = goal;
      let sad = await athleteService.updateAthlete(athlete);
      if (sad && sad.length > 0) {
        alert('Error updating Goal, refresh and try again');
      }
      refreshDonations();
    } else {
      console.error('Cannot get athlete');
      router.push(`/LumiFundraising/login`);
    }
  }

  return (
    <StyledContainer center={true}>
      <UpdateGoal>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateGoal(e);
          }}
        >
          <b>Update Goal Amount: </b>
          <input
            type="number"
            className={'input'}
            id="goalInput"
            defaultValue={athlete?.fundraiserAthleteGoal}
            min={fundraiser?.athleteGoal}
            required
          />
          <StyledButton>{'>'}</StyledButton>
        </form>
      </UpdateGoal>
      <Spacing></Spacing>
        <h1>
          {athlete?.name ?? 'Athlete Not found'} -{' '}
          {fundraiser?.name ?? 'Fundraiser Not found'}
        </h1>

        {/* Progress Bar */}
        <TopBar>
          <h1>
            {donationValue}/{athlete?.fundraiserAthleteGoal ?? 0}
          </h1>
          <MDBProgress height="20">
            <MDBProgressBar
              width={percentageComplete}
              valuemin={0}
              valuemax={100}
              bgColor={
                fundraiserService.getDonationProgressBarColor(
                  percentageComplete
                ) ?? 'success'
              }
            >
              {percentageComplete}%
            </MDBProgressBar>
          </MDBProgress>
          <h1>{donations?.length} Donations</h1>
        </TopBar>

        <GridStyle>
          <HalfCard>
            <CardHeader>Donation link</CardHeader>
            <CardContent>
              Donation link: <a href={donationLink}>{donationLink}</a>
            </CardContent>
          </HalfCard>
          <HalfCard>
            <CardHeader>Coaches Suggested Request message</CardHeader>
            <CardContent>{fundraiser?.requestMessage}</CardContent>
          </HalfCard>
        </GridStyle>

        {/* Table */}
        <MediumSpacing />
        <Button variant="dark" onClick={refreshDonations}>
          Refresh Donation Table
        </Button>
        <StyledTable>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Donator</th>
              <th scope="col">$ Amount</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {donations.map((donation: PackedDonation) => {
              donationNumber = donationNumber + 1;
              return (
                <tr key={donationNumber}>
                  <th scope="row">{donationNumber}</th>
                  <td>{donation.donator.name}</td>
                  <td>{donation.amount}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </StyledTable>
        <Spacing />
        <div>Failed Donations
          <ToolTip message="Might want to follow up if they did not make a follow up successful donation." />
        </div>
        <MediumSpacing />
        <StyledTable>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Donator</th>
              <th scope="col">$ Amount</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {failedDonations.map((donation: PackedDonation) => {
              failedDonationNumber = failedDonationNumber + 1;
              return (
                <tr key={failedDonationNumber}>
                  <th scope="row">{failedDonationNumber}</th>
                  <td>{donation.donator.name}</td>
                  <td>{donation.amount}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </StyledTable>
    </StyledContainer>
  );
};

export default AthletesPage;
