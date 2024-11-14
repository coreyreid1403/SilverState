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
// float: left;
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
            <LinkButton url="/Wines">Wines</LinkButton>
            <LinkButton url="/Products">Products</LinkButton>
            <LinkButton url="/Products">1</LinkButton>
          </Left>
          <Right>
            <LinkButton url="/Products">2</LinkButton>
            <LinkButton url="/Events">Events</LinkButton>
            <LinkButton url="/ContactUs">Contact Us</LinkButton>
            <LinkButton url="/History">History</LinkButton>
          </Right>
        </>
      ) : (
        <>
          <PhoneLinks href="/">Home</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Wines">Wines</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Products">Products</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Products">1</PhoneLinks>
          <StyledHr />
          <PhoneLinks href="/Products">2</PhoneLinks>
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
