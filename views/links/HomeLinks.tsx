import React from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import { PhoneLinks, StyledHr } from '../../styles/SharedStyles';
import LinkButton from './LinkButton';
/**
 * Links set up for base links
 */
function HomeLinks(props: any) {
  return (
    <MDBCollapse open={props.showAnimated}>
      {props.largeScreen ? (
        <>
          <LinkButton url="/LumiFundraising">Fundraising</LinkButton>
          <LinkButton url="/ContactUs">Contact Us</LinkButton>
          {/* <Link href="/LumiMeals">
          <button className={styles.neuBtn}>LumiMeals</button>
        </Link> */}
        </>
      ) : ( //TODO: Move logic to inside link button???
        <>
          <PhoneLinks href="/LumiFundraising">Fundraising</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/ContactUs">Contact Us</PhoneLinks>
          {/* <PhoneLinks href="/LumiMeals">
      LumiMeals
    </PhoneLinks> 
   */}
        </>
      )}
    </MDBCollapse>
  );
}

export default HomeLinks;

HomeLinks.propTypes = {
  showAnimated: PropTypes.bool.isRequired,
  largeScreen: PropTypes.bool.isRequired
};
