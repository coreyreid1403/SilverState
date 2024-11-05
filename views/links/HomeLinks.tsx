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
          <LinkButton url="/">Home</LinkButton>
          <LinkButton url="/Wines">Wines</LinkButton>
          <LinkButton url="/Products">Products</LinkButton>
          <LinkButton url="/Events">Events</LinkButton>
          <LinkButton url="/ContactUs">Contact Us</LinkButton>
          <LinkButton url="/History">History</LinkButton>
        </>
      ) : (
        <>
          <PhoneLinks href="/">Home</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Wines">Wines</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Products">Products</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Events">Events</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/ContactUs">Contact Us</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/History">History</PhoneLinks>
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
