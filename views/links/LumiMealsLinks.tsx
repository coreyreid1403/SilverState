import React, { useEffect, useRef, useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import Router from 'next/router';
import GlobalVariables from '../../util/LumiMeals/GlobalVariables';
import { PhoneLinks, StyledHr } from '../../styles/SharedStyles';
import LinkButton from './LinkButton';

/**
 * Links set up for Lumi Meals
 */
function LumiMealsLinks(props: any) {
  const [userFound, setUserFound] = useState(false);
  const [userId, setUserId] = useState('0');
  let globals = GlobalVariables.getInstance();
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
      globals?.getUser().then(user => {
        if (user) {
          setUserId(user.userId);
          setUserFound(true);
        }
      });
    }
  }

  return (
    <MDBCollapse open={props.showAnimated}>
      {/* <div className="bg-dark shadow-3 p-4"> */}
      {props.largeScreen ? (
        <>
          <LinkButton url="/LumiMeals">Home</LinkButton>
          <LinkButton url="/LumiMeals/login">Login</LinkButton>
          {/* //Only shows when logged in */}
          <LinkButton url={`/LumiMeals/${userId}/weekly`} hidden={!props.userFound}>Planner</LinkButton>
          <LinkButton url={`/LumiMeals/${userId}/recipeBook`} hidden={!props.userFound}>Recipe Book</LinkButton>
          <LinkButton url={`/LumiMeals/${userId}/addRecipe`} hidden={!props.userFound}>Add</LinkButton>
          <LinkButton url={`/LumiMeals/${userId}/recipe`} hidden={!props.userFound}>Recipe</LinkButton>
          <LinkButton url="/ContactUs">Contact Us</LinkButton>
        </>
      ) : (
        <>
          <PhoneLinks href="/LumiMeals">Home</PhoneLinks>
          <StyledHr />
          <PhoneLinks
            href={{
              pathname: '/LumiMeals/login'
            }}
          >
            Login
          </PhoneLinks>
          <StyledHr hidden={!props.userFound} />
          <PhoneLinks
            href={`/LumiMeals/${userId}/weekly`}
            hidden={!props.userFound}
          >
            Planner
          </PhoneLinks>
          <StyledHr hidden={!props.userFound} />
          {/* //Only shows when logged in */}
          <PhoneLinks
            href={`/LumiMeals/${userId}/recipeBook`}
            hidden={!props.userFound}
          >
            Recipe Book
          </PhoneLinks>
          <StyledHr hidden={!props.userFound} />
          {/* //Only shows when logged in */}
          <PhoneLinks
            href={`/LumiMeals/${userId}/addRecipe`}
            hidden={!props.userFound}
          >
            Add
          </PhoneLinks>
          <StyledHr hidden={!props.userFound} />
          {/* //Only shows when logged in */}
          <PhoneLinks
            href={`/LumiMeals/${userId}/recipe`}
            hidden={!props.userFound}
          >
            Recipe
          </PhoneLinks>
          <PhoneLinks href="/ContactUs">Contact Us</PhoneLinks>
        </>
      )}
    </MDBCollapse>
  );
}

export default LumiMealsLinks;

LumiMealsLinks.propTypes = {
  showAnimated: PropTypes.bool.isRequired,
  largeScreen: PropTypes.bool.isRequired
};
