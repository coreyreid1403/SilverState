// /* eslint-disable react-hooks/exhaustive-deps */
// import { NextPage } from 'next';
// import styled from 'styled-components';
// import StyledContainer from '../../views/StyledContainer';
// import { useEffect, useState } from 'react';
// import { Badge, Button } from 'react-bootstrap';
// import Fundraiser from '../../models/LumiFundraising/Fundraiser';
// import Donation from '../../models/LumiFundraising/Donation';
// import DonationService from '../../services/LumiFundraising/DonationService';
// import FundraiserService from '../../services/LumiFundraising/FundraiserService';
// import AthleteService from '../../services/LumiFundraising/AthleteService';
// import DonatorService from '../../services/LumiFundraising/DonatorService';
// import Skeleton from '../../views/Skeleton';

// const StyledBackground = styled.div`
//   background-color: var(--color-grey);
//   position: relative;
// `;

// const Test: NextPage = () => {
//   // useEffect(() => {
//   //   window.addEventListener("click", updateTarget);
//   //   return () => window.removeEventListener("click", updateTarget);
//   // }, []);

//   // const updateTarget = useCallback((e: any) => {
//   //   console.log(display);
//   //   if(display){
//   //     setDisplay(false);
//   //   }
//   // }, []);
//   const donationService = new DonationService();
//   const fundraiserService = new FundraiserService();
//   const athleteService = new AthleteService();
//   const donatorService = new DonatorService();

//   const [windowOpenFlag, setWindowOpenFlag] = useState(false);
//   const [display, setDisplay] = useState(false);
//   const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
//     undefined
//   );
//   let donationNumber = 0;
//   const [nIntervId, setNIntervId] = useState<any | undefined>(undefined);
//   const [donations, setDonations] = useState<Donation[]>([]);

//   useEffect(() => {
//     const getFundraiser = async () => {
//       const [fund, error] = await fundraiserService.getFundraiser('ph7b52');
//       if (fund) {
//         setFundraiser(fund);
//         // getDonations(fund?.id);
//       }
//     };
//     // getFundraiser();
//   }, []);

//   async function getDonations(fundraiserId: string | undefined): Promise<void> {
//     if (fundraiserId) {
//       let [donations, error] = await donationService.getDonationsByFundraiser(fundraiserId);
//       if (error.length > 0) {
//         console.error(error);
//       }
//       let num = 0;
//       //sort by date amd time
//       let list = donations.map((donation: Donation) => {
//         if (donation.cash === false) {
//           num = num + donation.amount;
//         }
//       });
//       // alert(num);
//     }
//   }

//   async function checkAthleteDonationCount(): Promise<void> {
//     alert("Turned Off");
//     // const [fund, error] = await fundraiserService.getFundraiser('ph7b52');
//     // if (fund) {
//     //   let [donations, error] = await donationService.getDonationsByFundraiser(fund.id);
//     //   console.log('Donations count: ' + donations.length);
//     //   let num = 0;
//     //   let [fundAthletes, error2] = await athleteService.getAthletesByFundraiserId(fund?.id);
//     //   let list = fundAthletes.map((athlete: Athlete) => {
//     //     if (athlete.donationsIds && athlete.donationsIds.length > 0) {
//     //       num = num + athlete.donationsIds.length
//     //     }
//     //   });
//     //   console.log('Athlete Donation count: ' + num);
//     // }
//   }

//   async function testPostgres(): Promise<void> {
//     let res = await donationService.cancelDonation('ZObmp9dhyorvY6fxI1Dqf');
//     console.error("Coprey - " + res + ' -- '+ JSON.stringify(res));
//   }

//   // window.onclick = function (event) {
//   //   if (!event.target?.matches('.dropbtn')) {
//   //     var dropdowns = document.getElementsByClassName('dropdown-content');
//   //     var i;
//   //     for (i = 0; i < dropdowns.length; i++) {
//   //       var openDropdown = dropdowns[i];
//   //       if (openDropdown.classList.contains('show')) {
//   //         openDropdown.classList.remove('show');
//   //       }
//   //     }
//   //   }
//   // };
//   return (
//     <StyledContainer>
//       <>
//       <Skeleton />
//         <Button>
//           asdasd{' '}
//           <Badge pill bg="danger">
//             attention requireed
//           </Badge>
//         </Button>
//         <Button onClick={checkAthleteDonationCount}>
//           checkAthleteDonationCount
//         </Button>
//         <Button onClick={testPostgres}>
//           Test Postgres
//         </Button>
//       </>
//     </StyledContainer>
//   );
// };

// export default Test;
