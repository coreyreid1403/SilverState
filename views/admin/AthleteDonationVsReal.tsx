// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import Donation from '../../../models/LumiFundraising/Donation';
// import Athlete from '../../../models/LumiFundraising/Users/Athlete';
// import AthleteService from '../../../services/LumiFundraising/AthleteService';
// import DonationService from '../../../services/LumiFundraising/DonationService';
// import { Spinner } from 'react-bootstrap';

// const Titles = styled.p`
//   font-weight: bold;
// `;

// const Center = styled.div`
//   padding: 10px;
//   text-align: center;
// `;

// /**
//  * The donation form
//  * @param props
//  * @returns
//  */
// // @ts-ignore
// function AthleteDonationVsReal({
//   athleteService,
//   donationService,
//   donations,
//   fundraiserId,
//   isOpen
// }: {
//   athleteService: AthleteService;
//   donationService: DonationService;
//   donations: Donation[];
//   fundraiserId: string;
//   isOpen: boolean;
// }) {
//   //if we have set up data or not
//   const dataFetchedRef = useRef(false);

//   const [athletesBad, setAthletesBad] = useState<Athlete[]>([]);
//   const [actualDonationNumbers, setActualDonationNumbers] = useState(new Map());

//   useEffect(() => {
//     if (!dataFetchedRef.current) {
//       athleteDonationVsReal();
//     }
//     dataFetchedRef.current = true;
//   }, []);

//   async function athleteDonationVsReal(): Promise<void> {
//     let [athletes, error] = await athleteService.getAthletesByFundraiserId(fundraiserId);
//     await addCompletedDonationIds(athletes);
//     let localMap = new Map<string, string[]>();
//     let localAthletesBad: Athlete[] = [];
//     //get map of real donations per athleteId
//     donations.forEach(donation => {
//       if (localMap.has(donation.athleteId)) {
//         let temp = localMap.get(donation.athleteId);
//         temp?.push(donation.donationId);
//         localMap.set(donation.athleteId, temp ?? []);
//       } else {
//         localMap.set(donation.athleteId, [donation.donationId]);
//       }
//     });
//     setActualDonationNumbers(localMap);

//     //compare to athletes list.
//     athletes.map(athlete => {
//       let athleteLacks = getLacks(
//         localMap.get(athlete.userId),
//         athlete.completedDonationsIds
//       );
//       let fundraiserLacks = getLacks(
//         athlete.completedDonationsIds,
//         localMap.get(athlete.userId)
//       );
//       if (
//         (athleteLacks?.length ?? 0) > 0 ||
//         (fundraiserLacks?.length ?? 0) > 0
//       ) {
//         localAthletesBad.push(athlete);
//       }
//     });
//     setAthletesBad(localAthletesBad);
//     alert('check ready');
//   }

//   async function addCompletedDonationIds(athletes: Athlete[]): Promise<void> {
//     await Promise.all(
//       athletes.map(async athlete => {
//         let completedIds = await donationService.getDonationsByAthlete(athlete.userId);
//         athlete.completedDonationsIds = completedIds.map(
//           donation => donation.donationId
//         );
//       })
//     );
//   }

//   function getLacks(
//     arr1: string[] | undefined,
//     arr2: string[] | undefined
//   ): string[] {
//     return (arr1 ?? []).filter(x => !(arr2 ?? []).includes(x));
//   }

//   return (
//     <>
//       {isOpen ? (
//         <MDBTable className="table table-striped">
//           <MDBTableHead>
//             <tr>
//               <th scope="col">Athlete</th>
//               <th scope="col">AthleteId</th>
//               <th scope="col">Athlete#</th>
//               <th scope="col">Actual#</th>
//               <th scope="col">Missing From Athlete</th>
//               <th scope="col">Missing From Team</th>
//             </tr>
//           </MDBTableHead>
//           <MDBTableBody>
//             {athletesBad.map((athlete: Athlete) => {
//               return (
//                 <tr key={athlete.userId}>
//                   <td>{athlete.name}</td>
//                   <td>{athlete.userId}</td>
//                   <td>{athlete.completedDonationsIds.length}</td>
//                   <td>
//                     {actualDonationNumbers.get(athlete.userId).length ?? 0}
//                   </td>
//                   <td>
//                     {getLacks(
//                       actualDonationNumbers.get(athlete.userId),
//                       athlete.completedDonationsIds
//                     ).join('\r\n')}
//                   </td>
//                   <td>
//                     {getLacks(
//                       athlete.completedDonationsIds,
//                       actualDonationNumbers.get(athlete.userId)
//                     ).join('\r\n')}
//                   </td>
//                 </tr>
//               );
//             })}
//           </MDBTableBody>
//         </MDBTable>
//       ) : (
//         <Spinner animation="border" />
//       )}
//     </>
//   );
// }

// export default AthleteDonationVsReal;
