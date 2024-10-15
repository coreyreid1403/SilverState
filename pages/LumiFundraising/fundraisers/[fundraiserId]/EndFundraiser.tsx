import type { NextPage } from 'next';
import StyledContainer from '../../../../views/StyledContainer';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import Donation from '../../../../models/LumiFundraising/Donation';
import AthleteService from '../../../../services/LumiFundraising/AthleteService';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import { dynamicSort } from '../../../../util/utils';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';
import FeeService from '../../../../services/LumiFundraising/FeeService';
import {
  CenterEverything,
  StyledRow,
  StyledTable
} from '../../../../styles/SharedStyles';
import BackButton from '../../../../views/BackButton';

const EndFundraiser: NextPage = () => {
  const fundraiserService = new FundraiserService();
  const athleteService = new AthleteService();
  const donationService = new DonationService();
  const feeService = new FeeService();

  const router = useRouter();
  let data = router.query;
  let fundraiserId: string = getFundraiserId(data.fundraiserId);
  //if we have set up data or not
  const dataFetchedRef = useRef(false);

  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [donations, setDonations] = useState<Donation[]>([]);
  const [cashDonations, setCashDonations] = useState<Donation[]>([]);
  const [coveredDonations, setCoveredDonations] = useState<Donation[]>([]);
  const [percentageParticipation, setPercentageParticipation] =
    useState<number>(0);
  const [athletes50, setAthletes50] = useState<Athlete[]>([]);
  const [athletes75, setAthletes75] = useState<Athlete[]>([]);
  const [athletes100, setAthletes100] = useState<Athlete[]>([]);
  const [amountCollected, setAmountCollected] = useState(0);
  const [fees, setFees] = useState(0);
  const [payout, setPayout] = useState(0);
  const [feeToPay, setFeeToPay] = useState(0);

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

  async function getFundraiser() {
    //get fund
    const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
    if (fund) {
      setFundraiser(fund);
      getDonations(fund.id);
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
      setCashDonations(donationsLocal.filter(x => x.cash === true));
      setCoveredDonations(
        donationsLocal.filter(x => x.cash === false && x.bonusTicket === true)
      );

      let collected =
        await fundraiserService.getAmountCollectedByDonations(donationsLocal);
      setAmountCollected(collected);
      getFees(donationsLocal);
      getAthletesAsync(fundraiserId, donationsLocal);
    }
  }

  async function getFees(donationsLocal: Donation[]) {
    let notCovered = donationsLocal.filter(
      x => x.cash === false && x.bonusTicket === false
    );
    let notCoveredAmount =
      await fundraiserService.getAmountCollectedByDonations(notCovered);

    setFeeToPay(feeService.calculateFeesSimple(notCoveredAmount));
    let collected = await fundraiserService.getAmountCollectedByDonations(
      donationsLocal.filter(x => x.cash === false)
    );
    let localFees = feeService.calculateFeesSimple(collected);
    setFees(localFees);
    setPayout(Math.round((collected - localFees) * 100) / 100);
  }

  async function getAthletesAsync(
    fundraiserId: string,
    donationsLocal: Donation[]
  ) {
    let [fundAthletes, error] =
      await athleteService.getAthletesByFundraiserId(fundraiserId);
    let sorted = await sortAthletesByAmount(fundAthletes, donationsLocal);
    setAthletes50(
      sorted.filter(x => (x.donationValue ?? 0) > x.fundraiserAthleteGoal * 0.5)
    );
    setAthletes75(
      sorted.filter(
        x => (x.donationValue ?? 0) > x.fundraiserAthleteGoal * 0.75
      )
    );
    setAthletes100(
      sorted.filter(x => (x.donationValue ?? 0) > x.fundraiserAthleteGoal)
    );

    calculateParticipation(sorted, donationsLocal);
  }

  async function sortAthletesByAmount(
    fundAthletes: Athlete[],
    donationsLocal: Donation[]
  ) {
    let byValue = fundAthletes.map(athlete => {
      const athleteDonations = donationsLocal.filter(
        donation => donation.athleteId === athlete.userId
      );
      athlete.donationValue = athleteDonations.reduce(
        (n, { amount }) => n + amount,
        0
      );
      return athlete;
    });
    let sort = byValue.sort(dynamicSort('donationValue'));
    return sort;
  }

  function calculateParticipation(
    fundAthletes: Athlete[],
    donationsLocal: Donation[]
  ) {
    let fundedAthletes = 0;
    fundAthletes.forEach(async athlete => {
      const athleteHasDonation = donationsLocal.find(
        donation => donation.athleteId === athlete.userId
      );
      if (athleteHasDonation) {
        fundedAthletes++;
      }
    });
    setPercentageParticipation(getParticipation(fundedAthletes, fundAthletes));
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

  /**
   * Trims down routing var to Id
   * @param id
   */
  function getFundraiserId(id: string | string[] | undefined) {
    return typeof id == 'string' ? id : '';
  }

  function addWeekToDate(fundEndDate: Date | undefined) {
    if (fundEndDate) {
      fundEndDate.setDate(fundEndDate.getDate() + 7);
      return fundEndDate.toDateString();
    }
    return '';
  }

  return (
    <StyledContainer>
      <BackButton router={router}>Return to Fundraisers</BackButton>
      <CenterEverything>
        <h2>{fundraiser?.name ?? ''} - Summary</h2>
        <StyledTable>
          <tbody>
            <tr>
              <StyledRow>Total collected:</StyledRow>
              <StyledRow>{amountCollected}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Percent of Goal:</StyledRow>
              <StyledRow>
                {Math.round(
                  (amountCollected / (fundraiser?.overallGoal ?? 1)) * 100
                )}
                %
              </StyledRow>
            </tr>
            <tr>
              <StyledRow>Percent Cash donations:</StyledRow>
              <StyledRow>
                {Math.round((cashDonations.length / donations.length) * 100)}%
              </StyledRow>
            </tr>
            <tr>
              <StyledRow>Percent donators covered fees:</StyledRow>
              <StyledRow>
                {Math.round(
                  ((coveredDonations.length + cashDonations.length) /
                    donations.length) *
                    100
                )}
                %
              </StyledRow>
            </tr>
            <tr>
              <StyledRow>Total Fees:</StyledRow>
              <StyledRow>${fees}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Total fees out of your pocket:</StyledRow>
              <StyledRow>${feeToPay}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Check Amount:</StyledRow>
              <StyledRow>${payout}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Check will be sent to:</StyledRow>
              <StyledRow>{fundraiser?.payoutAddress}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Check addressee:</StyledRow>
              <StyledRow>{fundraiser?.payoutName}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Check Date:</StyledRow>
              <StyledRow>{addWeekToDate(fundraiser?.endDate)}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Athlete Participation:</StyledRow>
              <StyledRow>{percentageParticipation}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Athletes 50%:</StyledRow>
              <StyledRow>{athletes50.length}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Athletes 75%:</StyledRow>
              <StyledRow>{athletes75.length}</StyledRow>
            </tr>
            <tr>
              <StyledRow>Athletes 100%:</StyledRow>
              <StyledRow>{athletes100.length}</StyledRow>
            </tr>
          </tbody>
        </StyledTable>
      </CenterEverything>
    </StyledContainer>
  );
};

export default EndFundraiser;
