// import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
// import { useState, useEffect } from 'react';
// import Athlete from '../../../models/LumiFundraising/Users/Athlete';
// import FundraiserService from '../../../services/LumiFundraising/FundraiserService';
// import AthleteService from '../../../services/LumiFundraising/AthleteService';
// import localStyles from '../../../styles/LumiFundraising/views/athleteRow.module.css';
// import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
// import VerifyPopUpWindow from '../../popups/VerifyPopUpWindow';
// import FormPopUpWindow from '../../popups/FormPopUpWindow';
// import AddDonationForm from '../../Forms/AddDonationForm';
// import { FundraiserTypes } from '../../../models/LumiFundraising/enums';
// import DonationService from '../../../services/LumiFundraising/DonationService';
// import Donation from '../../../models/LumiFundraising/Donation';
// import { StyledRow } from '../../../styles/SharedStyles';

// function AthleteRow({
//   athlete,
//   athleteService,
//   athleteDonationMap,
//   donationService,
//   fundraiserService,
//   fundraiser,
//   setRefresh,
//   sortByAmount
// }: {
//   athlete: Athlete;
//   athleteDonationMap: Map<string, Donation[]>;
//   athleteService: AthleteService;
//   donationService: DonationService;
//   fundraiserService: FundraiserService;
//   fundraiser: Fundraiser | undefined;
//   setRefresh: Function;
//   sortByAmount: boolean;
// }) {
//   const [percentageComplete, setPercentageComplete] = useState('0');
//   const [donationValue, setDonationValue] = useState(0);
//   const [windowOpenFlag, setWindowOpenFlag] = useState(false);

//   useEffect(() => {
//     if (sortByAmount) {
//       setDonationValue(athlete.donationValue ?? 0);
//       athleteService
//         .getPercentageCompleteWithValue(athlete, athlete.donationValue ?? 0)
//         .then(setPercentageComplete);
//     } else {
//       athleteService.getDonationsValueFromDonations(athleteDonationMap.get(athlete.userId) ?? []).then(value => {
//         setDonationValue(value);
//         athleteService
//           .getPercentageCompleteWithValue(athlete, value)
//           .then(setPercentageComplete);
//       });
//     }
//   }, [athlete, athleteService, donationValue]);

//   async function addDonation(fields: any) {
//     let donatorName: string = fields.target.nameInput.value;
//     let donatorEmail: string = fields.target.emailInput?.value ?? '';
//     let amount: number = Number(fields.target.amountInput.value);
//     if(fundraiser){
//       let donationId: string = await donationService.createDonation(
//         donatorName,
//         donatorEmail,
//         amount,
//         athlete.userId,
//         athlete.name,
//         fundraiser.id,
//         true,
//         false,
//         true
//       );
      
//       if (donationId.length === 0) {
//         alert('Error adding donation. Please try again');
//       }
      
//       setRefresh(true);
//     }
//   }

//   async function removeAthlete() {
//     if (fundraiser) {
//       await athleteService.removeAthlete(fundraiser.id, athlete.userId);
//       setRefresh(true);
//     }
//   }

//   return (
//     <tr key={athlete.userId}>
//       <StyledRow>{athlete.name}</StyledRow>
//       <StyledRow>{athlete.userId}</StyledRow>
//       <StyledRow>{donationValue}</StyledRow>
//       <StyledRow>
//         <MDBProgress height="20">
//           <MDBProgressBar
//             width={percentageComplete}
//             valuemin={0}
//             valuemax={100}
//             bgColor={
//               fundraiserService.getDonationProgressBarColor(
//                 percentageComplete
//               ) ?? 'success'
//             }
//           >
//             {percentageComplete}%
//           </MDBProgressBar>
//         </MDBProgress>
//       </StyledRow>
//       <StyledRow>
//         <FormPopUpWindow
//           title="Add Donation"
//           buttonName="Add Donation"
//           windowOpen={windowOpenFlag}
//           setWindowOpenFlag={setWindowOpenFlag}
//         >
//           {' '}
//           <AddDonationForm
//             setWindowOpenFlag={setWindowOpenFlag}
//             submit={addDonation}
//             athleteName={athlete.name}
//             fundraiserName={fundraiser?.name ?? ''}
//             emailRequired={!!((fundraiser?.type ?? 0) & FundraiserTypes.Raffle)}
//           />{' '}
//         </FormPopUpWindow>
//       </StyledRow>
//       <StyledRow>
//         <VerifyPopUpWindow
//           title="Remove Athlete"
//           buttonName="X"
//           submitButtonName="Remove"
//           buttonClick={removeAthlete}
//         >
//           {' '}
//           You sure you want to remove <b>{athlete.name}</b> from the{' '}
//           <b>{fundraiser?.name}</b>?{' '}
//         </VerifyPopUpWindow>
//       </StyledRow>
//     </tr>
//   );
// }

// export default AthleteRow;
