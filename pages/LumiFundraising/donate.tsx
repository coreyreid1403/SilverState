/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import localStyles from '../../styles/LumiFundraising/pages/donate.module.css';
import DonationForm from '../../views/LumiFundraising/Forms/DonationForm';
import Image from 'next/image';
import logo from '../../public/assets/images/logos/Damonte_Ranch.png';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import FundraiserService from '../../services/LumiFundraising/FundraiserService';
import Fundraiser from '../../models/LumiFundraising/Fundraiser';
import AthleteService from '../../services/LumiFundraising/AthleteService';
import DonationConstants from '../../util/LumiFundraising/DonationConstants';
import { redirect } from 'next/navigation';
import Cart from '../../models/LumiFundraising/Cart';
import PaymentService from '../../services/LumiFundraising/PaymentService';
import styled from 'styled-components';
import CoachService from '../../services/LumiFundraising/CoachService ';
import StyledContainer from '../../views/StyledContainer';
import DonationService from '../../services/LumiFundraising/DonationService';
import FeeService from '../../services/LumiFundraising/FeeService';

const StyledImage = styled(Image)`
  display: block;
  width: 200px;
  height: 200px;
`;

const Disclaimer = styled.p`
  padding: 10px;
  max-width: 550px;
  margin: auto;
`;

/**
 * This page takes the given url for donating,
 * gets the nanoid from url,
 * and redirects to correct form.
 *
 * If no nanoid is presented,
 * lets them select who they want to donate to
 */
const Donate: NextPage = () => {
  const router = useRouter();
  let data = router.query;
  let fundraiserId = data.fundraiserId;
  let athleteId = data.athleteId;

  const feeService = new FeeService();
  const paymentService = new PaymentService();
  const fundraiserService = new FundraiserService();
  const athleteService = new AthleteService();
  const coachService = new CoachService();
  const donationService = new DonationService();
  const [athleteName, setAthleteName] = useState<string>('');
  const [coachName, setCoachName] = useState<string>('Head Coach');
  const [coverExtraTicket, setCoverExtraTicket] = useState<boolean>(false);
  const [raffleTicketAmount, setRaffleTicketAmount] = useState<number>(0);
  //if we have set up data or not
  const dataFetchedRef = useRef(false);

  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  async function getAthleteName(
    athleteId: any,
    fundraiserId: string
  ): Promise<string> {
    if (
      athleteId &&
      typeof athleteId === 'string' &&
      fundraiserId &&
      typeof fundraiserId === 'string'
    ) {
      const [athlete, error] = await athleteService.getAthlete(
        athleteId,
        fundraiserId
      );
      if (error && error.length > 0) {
        console.error('Error getting athlete');
        console.error(error);
        //TODO: show error - 'Error setting user'
      } else if (athlete) {
        return athlete.name;
      }
    }
    return '';
  }

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      fundraiserId = data.fundraiserId;
      athleteId = data.athleteId;

      if (fundraiserId) {
        if (!dataFetchedRef.current) {
          getFundraiser();
        }
        dataFetchedRef.current = true;
      }
    }
  }, [router]);

  const getFundraiser = async () => {
    if (fundraiserId && typeof fundraiserId === 'string') {
      const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
      if (fund) {
        if (fund.endDate && fund.endDate < new Date()) {
          redirect(`/LumiFundraising/FundraiserEnded`);
        } else {
          setFundraiser(fund);
          let athleteName = await getAthleteName(athleteId, fund.id);
          setAthleteName(athleteName);
          let [coach, error] = await coachService.getCoach(fund.coachEmail);
          if (coach && error.length === 0) {
            setCoachName(coach.displayName);
          } else {
            console.log(
              'Error getting coach from donation page: ' +
                fund.coachEmail +
                ' : ' +
                error
            );
          }
          let fundProps = fundraiserService.getRaffleProperties(fund.typeProperties)
          if(fundProps){
            setCoverExtraTicket(fundProps.coverExtraTicket)
            setRaffleTicketAmount(fundProps.pricePerTicket);
          }
        }
      }
    }
  };

  async function submit(fields: any) {
    let name: string = fields.target.nameInput.value;
    let donatorEmail: string = fields.target.emailInput?.value ?? '';
    let amount: number = Number(fields.target.amountInput.value);
    let coverCharges: boolean = fields.target.coverChargesInput.checked;

    if (athleteId && typeof athleteId === 'string') {
      //new var to see if we need to add the fees to the donation object or not
      let donationAmount = amount;
      if(coverCharges){
        donationAmount = amount + feeService.calculateFeesCompounding(amount);
      }

      if (fundraiserId && typeof fundraiserId === 'string') {
        let donationId: string = await donationService.createDonation(name, donatorEmail, donationAmount, athleteId, athleteName, fundraiserId, false, coverCharges , false);
        if(donationId.length === 0){
          alert('Error making donation. Please try again');
          return;
        }
        //send cart to payment service
        let cart = new Cart(
          name,
          donatorEmail,
          fundraiser?.team ?? '',
          fundraiserService.getTeamId(fundraiser?.team ?? ''),
          coverCharges,
          feeService.calculateFeesCompounding(amount),
          amount,
          donationId,
          fundraiserId
        );
        //redirects to new page
        await paymentService.sendCart(cart);
      } else {
        console.error('Bad fundraiser Id:' + fundraiserId);
      }
    } else {
      console.error('Bad athlete Id:' + athleteId);
    }
  }

  return (
    <StyledContainer center={true}>
      <div className={localStyles.gridContainer}>
        <div className={localStyles.logo}>
          <StyledImage
            src={logo}
            alt="School Logo"
            width={200}
            height={200}
            className={localStyles.teamLogo}
          />
        </div>
        <div className={localStyles.quote}>
          {fundraiser?.noteFromCoach ?? ''}
          <br /> - {coachName}
        </div>
      </div>
      <div className={localStyles.donateBodyItem}>
        <DonationForm
          fundraiserName={fundraiser?.name ?? ''}
          athleteName={athleteName}
          primary={fundraiser?.primaryColor ?? DonationConstants.defaultPrimary}
          secondary={
            fundraiser?.secondaryColor ?? DonationConstants.defaultSecondary
          }
          invertFontColor={fundraiser?.invertFontColor ?? false}
          feeService={feeService}
          submit={submit}
          emailRequired={raffleTicketAmount > 0}
          coverExtraTicket={coverExtraTicket}
          ticketPrice={raffleTicketAmount}
        />
      </div>
      <Disclaimer>
        *A convenience fee is required from donation to maintain website. To
        avoid these charges, donate in cash or check. Fees include: 3% + $.30
        for card encryption/security, and 3% for website cost
      </Disclaimer>
    </StyledContainer>
  );
};

export default Donate;
