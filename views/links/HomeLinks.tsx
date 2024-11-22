import React from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import { PhoneLinks, StyledHr } from '../../styles/SharedStyles';
import LinkButton from './LinkButton';
import styled from 'styled-components';
/**
 * Links set up for base links
 */
function HomeLinks(props: any) {

const Left = styled.div`
`;
const Right = styled.div`
float: right;
margin-top: -30px;
padding-right: 10px
`;
  return (
    <MDBCollapse open={props.showAnimated}>
      {props.largeScreen ? (
        <>
          <Left>
            <LinkButton url="/">Home</LinkButton>
            <LinkButton url="/Products">Products</LinkButton>
            <LinkButton url="/Events">Events</LinkButton>
            <LinkButton url="/History">History</LinkButton>
          </Left>
          <Right>
            <LinkButton url="/Growers">Growers</LinkButton>
            <LinkButton url="/Location">Location</LinkButton>
            <LinkButton url="/ContactUs">Contact Us</LinkButton>
            <LinkButton url="/Cart">Cart</LinkButton>
          </Right>
        </>
      ) : (
        <>
          <PhoneLinks href="/">Home</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Products">Products</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Events">Events</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/History">History</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Growers">Growers</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Location">Location</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/ContactUs">Contact Us</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Cart">Cart</PhoneLinks>
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
