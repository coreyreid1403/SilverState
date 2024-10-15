/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/login.module.css';
import { CookieManager } from '../../managers/CookieManager';
import { Constants } from '../../util/LumiMeals/Constants';
import GlobalVariables from '../../util/LumiMeals/GlobalVariables';
import AlertPopUp from '../../views/popups/AlertPopUp';
import Link from 'next/link';
import NormalLogin from '../../views/Logins/NormalLogin';
import AthleteLogin from '../../views/Logins/AthleteLogin';
import DonationConstants from '../../util/LumiFundraising/DonationConstants';
import FundraiserGlobalVariables from '../../util/LumiFundraising/FundraiserGlobalVariables';
import FundraiserUserService from '../../services/LumiFundraising/FundraiserUserService';
import { UserService } from '../../services/LumiMeals/UserService';
import StyledContainer from '../../views/StyledContainer';

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  let data = router.query;
  let product = data.product;

  // const Cryptr = require("cryptr");
  // const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING ?? "BAD");
  const cookieManager = new CookieManager();
  const userService = new UserService();
  const fundraiserUserService = new FundraiserUserService();
  let mealsGlobals = GlobalVariables.getInstance();
  let fundGlobals = FundraiserGlobalVariables.getInstance();
  /**
   * Decides to show login or sign up
   */
  const [login, setLogin] = useState(false);

  const [loginText, setLoginText] = useState('Sign In');
  const [signUpText, setSignUpText] = useState('Sign Up');

  const [isCoach, setIsCoach] = useState(false);

  /**
   * var for error popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const togglePopUp = () => setShowPopUP(!showPopUP);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      product = data.product;
    }
  }, [router]);

  /**
   * remove ".", "#", "$", "[", or "]" from email
   * @param email inputted email
   */
  function trimEmail(email: string): string {
    return email
      .replaceAll('.', '')
      .replaceAll('#', '')
      .replaceAll('$', '')
      .replaceAll('[', '')
      .replaceAll(']', '');
  }

  return (
    <StyledContainer>
      <></>
    </StyledContainer>
  );
};

export default ForgotPassword;
