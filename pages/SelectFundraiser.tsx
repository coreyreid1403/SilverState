// /* eslint-disable react-hooks/exhaustive-deps */
// import type { NextPage } from 'next';
// import { Button, Form } from 'react-bootstrap';
// import AthleteService from '../../services/LumiFundraising/AthleteService';
// import Athlete from '../../models/LumiFundraising/Users/Athlete';
// import FundraiserVariables from '../../util/LumiFundraising/FundraiserGlobalVariables';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import FundraiserService from '../../services/LumiFundraising/FundraiserService';
// import Fundraiser from '../../models/LumiFundraising/Fundraiser';
// import styled from 'styled-components';
// import LocalButton from '../../views/LinkButton';
// import StyledContainer from '../../views/StyledContainer';
// import { dynamicSort } from '../../util/utils';

// const StyledP = styled.p`
//   margin: 30px;
// `;

// const SelectContainer = styled.div`
//   width: 100%;
//   max-width: 800px;
//   padding: 15px;
// `;

// const SelectFundraiser: NextPage = () => {
//   let globals = FundraiserVariables.getInstance();
//   let athleteService = new AthleteService();
//   let fundraiserService = new FundraiserService();

//   const [activeFundraisers, setActiveFundraisers] = useState<Fundraiser[]>([]);
//   const [selectedFundraiser, setSelectedFundraiser] = useState<
//     Fundraiser | undefined
//   >(undefined);
//   const [selectedAthlete, setSelectedAthlete] = useState<Athlete | undefined>(
//     undefined
//   );
//   const [fundraiserAthletes, setFundraiserAthletes] = useState<Athlete[]>([]);

//   useEffect(() => {
//     getActiveFundraisers();
//   }, []);

//   async function getActiveFundraisers() {
//     const fundraisers = await fundraiserService.getActiveFundraisers();
//     setActiveFundraisers(fundraisers);
//   }

//   /**
//    * Run on selected fundraiser change
//    */
//   useEffect(() => {
//     if (selectedFundraiser) {
//       getAthletesForFundraiser(selectedFundraiser);
//     }
//   }, [selectedFundraiser]);

//   async function getAthletesForFundraiser(fundraiser: Fundraiser) {
//     const [athletes, error] = await athleteService.getAthletesByFundraiserId(fundraiser.id);
//     if (error && error.length > 0) {
//       console.log(
//         'Error getting athletes for fundraiser: ' +
//           fundraiser.id +
//           ' : ' +
//           error
//       );
//     } else {
//       let sorted = athletes.sort(dynamicSort('name'));
//       setFundraiserAthletes(athletes);
//     }
//   }

//   function OnFundraiserSelect(event: any) {
//     let fundName: string = event.target.value;
//     let fund = activeFundraisers.find(fund => fund.name === fundName);
//     if (fund){
//       setSelectedFundraiser(fund)
//     }
//     else{
//       setSelectedFundraiser(undefined);
//     }
//   }

//   function OnAthleteSelect(event: any) {
//     let athleteName: string = event.target.value;
//     let athlete = fundraiserAthletes.find(fund => fund.name === athleteName);
//     if (athlete){
//       setSelectedAthlete(athlete)
//     }
//   }

//   return (
//     <StyledContainer center={true}>
//         <p>Select an active Fundraiser</p>
//         <SelectContainer>
//         {/* {activeFundraisers} */}
//         <Form.Select size="lg" onChange={OnFundraiserSelect}>
//         <option></option>
//         {activeFundraisers.map(fund => {
//               return (
//                 <option key={fund.id} value={fund.name}>
//                   {fund.name}
//                 </option>
//               );
//             })}
//         </Form.Select>
//         </SelectContainer>
//         {selectedFundraiser ? (
//           <>
//           <br />
//             <p>Select an Athlete</p>
//             <SelectContainer>
//             <Form.Select size="lg" onChange={OnAthleteSelect}>
//             <option></option>
//             {fundraiserAthletes.map(athlete => {
//               return (
//                 <option key={athlete.userId} value={athlete.name}>
//                   {athlete.name}
//                 </option>
//               );
//             })}
//             </Form.Select>
//             </SelectContainer>
//           </>
//         ) : (
//           <></>
//         )}
//         {selectedAthlete ? (
//           <Link
//             href={{
//               pathname: '/LumiFundraising/donate',
//               query: {
//                 fundraiserId: selectedFundraiser?.id,
//                 athleteId: selectedAthlete?.userId
//               }
//             }}
//           >
//             <StyledP>
//               <LocalButton>Donation</LocalButton>
//             </StyledP>
//           </Link>
//         ) : (
//           <></>
//         )}
//     </StyledContainer>
//   );
// };

// export default SelectFundraiser;
