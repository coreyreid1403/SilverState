import React, { useEffect, useRef, useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import { Router } from 'next/router';
import FundraiserGlobalVariables from '../../util/LumiFundraising/FundraiserGlobalVariables';
import { PhoneLinks, StyledHr } from '../../styles/SharedStyles';
import LinkButton from './LinkButton';
import Athlete from '../../models/LumiFundraising/Users/Athlete';

/**
 * Links set up for Lumi Fundraising
 */
function LumiFundraisingLinks(props: any) {
  const [isCoach, setIsCoach] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined);
  let globals = FundraiserGlobalVariables.getInstance();
  //if we have set up data or not
  const dataFetchedRef = useRef(false);

  /**
   * runs once
   */
  useEffect(() => {
    if (!dataFetchedRef.current) {
      lookForUser();
      //TODO: on refresh it goes back to bad
      //runs each url change, checks if user is logged in to see what links to show.
      Router.events.on('routeChangeStart', () => {
        lookForUser();
      });
    }
    dataFetchedRef.current = true;
  }, []);

  /**
   * Looks for user
   * reveals links if found
   */
  function lookForUser() {
    if (!userFound) {
      globals?.checkUser().then(async user => {
        if (user !== undefined) {
          setUserFound(true);
          if (user) {
            setIsCoach(true);
          } else {
            setIsCoach(false);
            setAthlete(await globals?.getAthlete());
          }
        }
      });
    }
  }

  return (
    <MDBCollapse open={props.showAnimated}>
      {props.largeScreen ? (
        <>
          <LinkButton url="/LumiFundraising">Home</LinkButton>
          <LinkButton url="/LumiFundraising/login">Login</LinkButton>
          <LinkButton url="/LumiFundraising/SelectFundraiser">
            Donate
          </LinkButton>
          {/* //Only shows for Coaches */}
          <LinkButton
            url="/LumiFundraising/fundraisers"
            hidden={!userFound || !isCoach}
          >
            Fundraisers
          </LinkButton>
          {/* //Only shows for Athletes */}
          <LinkButton
            url={`/LumiFundraising/athletes/${athlete?.fundraiserId}/${athlete?.userId}`}
            hidden={!userFound || isCoach}
          >
            Athletes
          </LinkButton>
          <LinkButton url="/ContactUs">Contact Us</LinkButton>
        </>
      ) : (
        <>
          <PhoneLinks href="/LumiFundraising">Home</PhoneLinks>
          <StyledHr />
          <PhoneLinks
            href={{
              pathname: '/LumiFundraising/login'
            }}
          >
            Login
          </PhoneLinks>
          <StyledHr />
          <PhoneLinks href={{ pathname: '/LumiFundraising/SelectFundraiser' }}>
            Donate
          </PhoneLinks>
          <StyledHr />
          {/* //Only shows for Coaches */}
          <PhoneLinks
            href={`/LumiFundraising/fundraisers`}
            hidden={!userFound || !isCoach}
          >
            Fundraisers
          </PhoneLinks>
          <StyledHr hidden={!userFound || !isCoach} />
          {/* //Only shows for Athletes */}
          {athlete && (
            <PhoneLinks
              href={`/LumiFundraising/athletes/${athlete?.fundraiserId}/${athlete?.userId}`}
              hidden={!userFound || isCoach}
            >
              Athletes
            </PhoneLinks>
          )}
          <PhoneLinks href="/ContactUs">Contact Us</PhoneLinks>
        </>
      )}
    </MDBCollapse>
  );
}

export default LumiFundraisingLinks;

LumiFundraisingLinks.propTypes = {
  showAnimated: PropTypes.bool.isRequired,
  largeScreen: PropTypes.bool.isRequired
};
