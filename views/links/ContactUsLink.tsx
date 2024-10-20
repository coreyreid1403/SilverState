// import React, { useEffect, useRef, useState } from 'react';
// import { MDBCollapse } from 'mdb-react-ui-kit';
// import PropTypes from 'prop-types';
// import { Router } from 'next/router';
// import FundraiserGlobalVariables from '../../util/LumiFundraising/FundraiserGlobalVariables';
// import { PhoneLinks, StyledHr } from '../../styles/SharedStyles';
// import LinkButton from './LinkButton';
// import Athlete from '../../models/LumiFundraising/Users/Athlete';

// /**
//  * Links set up for Lumi Fundraising
//  */
// function ContactUsLinks(props: any) {
//   return (
//     <MDBCollapse open={props.showAnimated}>
//       {props.largeScreen ? (
//         <>
//           <LinkButton url="/LumiFundraising">Contact Us</LinkButton>
//         </>
//       ) : (
//         <>
//           <PhoneLinks href="/LumiFundraising">Home</PhoneLinks>
//         </>
//       )}
//     </MDBCollapse>
//   );
// }

// export default ContactUsLinks;

// ContactUsLinks.propTypes = {
//   showAnimated: PropTypes.bool.isRequired,
//   largeScreen: PropTypes.bool.isRequired
// };
