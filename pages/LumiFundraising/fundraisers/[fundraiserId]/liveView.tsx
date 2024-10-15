/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import localStyles from '../../../../styles/LumiFundraising/pages/athlete.module.css';
import { useRouter } from 'next/router';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import { useEffect, useRef, useState } from 'react';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Donation from '../../../../models/LumiFundraising/Donation';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import StyledContainer from '../../../../views/StyledContainer';
import { CenterEverything, PaddingDiv, SideLinkArea, TopBar } from '../../../../styles/SharedStyles';
import { Button } from 'react-bootstrap';
import AthleteService from '../../../../services/LumiFundraising/AthleteService';
import DonatorService from '../../../../services/LumiFundraising/DonatorService';
import PackedDonation from '../../../../models/LumiFundraising/PackedDonation';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';
import BackButton from '../../../../views/BackButton';

const LiveView: NextPage = () => {
  const donationService = new DonationService();
  const fundraiserService = new FundraiserService();
  const athleteService = new AthleteService();
  const donatorService = new DonatorService();
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
  let donationNumber = 0;
  const [nIntervId, setNIntervId] = useState<any | undefined>(undefined);
  const [donations, setDonations] = useState<PackedDonation[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      const getFundraiser = async () => {
        if (fundraiserId && typeof fundraiserId === 'string') {
          const [fund, error] =
            await fundraiserService.getFundraiser(fundraiserId);
          if (fund) {
            setFundraiser(fund);
            getDonations(fund?.id);
            getAthletes(fund?.id);
          }
        }
      };

      if (!dataFetchedRef.current) {
        getFundraiser();
      }
      dataFetchedRef.current = true;
    }
  }, [router]);

  function getPercentage(): string {
    return Math.round(
      ((fundraiserService.getAmountCollectedByDonations(donations) ?? 35) /
        (fundraiser?.overallGoal ?? 100)) *
        100
    ).toString();
  }

  function startSession(): void {
    //stop session after an hour
    setTimeout(
      () => {
        //TODO: pop up that session has ended
        stopSession();
      },
      60 * 60 * 1000
    );
    getDonations(fundraiser?.id);
    alert('Starting Live View');
    if (!nIntervId) {
      setNIntervId(
        setInterval(async function () {
          getDonations(fundraiser?.id);
        }, 10 * 1000)
      ); // 10 seconds
    }
  }

  function stopSession(): void {
    clearInterval(nIntervId);
    // release our intervalID from the variable
    setNIntervId(undefined);
    alert('End Live View');
  }

  async function getDonations(fundraiserId: string | undefined): Promise<void> {
    if (fundraiserId) {
      let [donations, error] = await donationService.getPackedDonationsByFundraiser(fundraiserId);
      if (error.length > 0) {
        console.error(error);
      }
      //sort by date amd time
      donations.sort((a, b) => {
        return new Date(b.received).valueOf() - new Date(a.received).valueOf();
      });
      setDonations(donations);
    }
  }

  async function getAthletes(fundraiserId: string | undefined): Promise<void> {
    if (fundraiserId) {
      let [athletes, error] = await athleteService.getAthletesByFundraiserId(fundraiserId);
      if (error.length > 0) {
        console.error(error);
      }
      setAthletes(athletes);
    }
  }

  return (
    <StyledContainer>
      <BackButton router={router}>Return to Fundraiser</BackButton>
      <CenterEverything>
        <h1>{fundraiser?.name ?? 'Fundraiser Name'}</h1>
        <TopBar>
          <h1>
            {fundraiserService.getAmountCollectedByDonations(donations) ??
              '000.00'}
            /{fundraiser?.overallGoal ?? '000.00'}
          </h1>
          <MDBProgress height="20">
            <MDBProgressBar
              width={getPercentage()}
              valuemin={0}
              valuemax={100}
              bgColor={fundraiserService.getDonationProgressBarColor(
                getPercentage()
              )}
            >
              {getPercentage()}%
            </MDBProgressBar>
          </MDBProgress>
        </TopBar>
      </CenterEverything>
      <SideLinkArea>
        <PaddingDiv>
          <Button variant="dark" onClick={() => startSession()}>
            Start Live Session
          </Button>
        </PaddingDiv>
        <PaddingDiv>
          <Button variant="dark" onClick={() => stopSession()}>
            Stop Live Session
          </Button>
        </PaddingDiv>
      </SideLinkArea>
      <h1>Live View</h1>
      <MDBTable className="table table-striped">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Donator</th>
            <th scope="col">Type</th>
            <th scope="col">Athlete</th>
            <th scope="col">Amount</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {donations.map((donation: PackedDonation) => {
            donationNumber = donationNumber + 1;
            return (
              <tr key={donationNumber}>
                <th scope="row">{donationNumber}</th>
                <td>{donation.donator.name}</td>
                <td>{donation.cash ? 'Cash' : 'Card'}</td>
                <td>{athletes.find(athlete => athlete.userId === donation.athleteId)?.name ?? ''}</td>
                <td>{donation.amount}</td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </StyledContainer>
  );
};

export default LiveView;
