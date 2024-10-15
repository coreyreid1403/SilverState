/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import logo from "../../public/OtherImages/Logo/logo.gif";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/pages/login.module.css";
import { CookieManager } from "../../managers/CookieManager";
import { Constants } from "../../util/LumiMeals/Constants";
import GlobalVariables from "../../util/LumiMeals/GlobalVariables";
import AlertPopUp from "../../views/popups/AlertPopUp";
import NormalLogin from "../../views/Logins/NormalLogin";
import AthleteLogin from "../../views/Logins/AthleteLogin";
import DonationConstants from "../../util/LumiFundraising/DonationConstants";
import FundraiserGlobalVariables from "../../util/LumiFundraising/FundraiserGlobalVariables";
import NormalSignUp from "../../views/Logins/NormalSignUp";
import Athlete from "../../models/LumiFundraising/Users/Athlete";
import Coach from "../../models/LumiFundraising/Users/Coach";
import FundraiserUserService from "../../services/LumiFundraising/FundraiserUserService";
import { UserService } from "../../services/LumiMeals/UserService";

const Login: NextPage = () => {
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

  const [loginText, setLoginText] = useState("Sign In");
  const [signUpText, setSignUpText] = useState("Sign Up");

  const [isCoach, setIsCoach] = useState(false);

  /**
   * var for error popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const togglePopUp = () => setShowPopUP(!showPopUP);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      product = data.product;
    }
  }, [router]);

  /**
   * SignUp on click method
   * @param fields array of inputs
   */
  async function signUp(fields: any) {
    setSignUpText("Loading...");
    if (product === "LumiFundraising") {
      signUpFundraising(fields);
    } else if (product === "LumiMeals") {
      let name = fields.target.nameInput?.value;
      let email = trimEmail(fields.target.emailInput?.value).toLowerCase().trim();
      let password =fields.target.passwordInputSignUp?.value; //cryptr.encrypt(fields.target.passwordInputSignUp?.value);
      let [user, error] = await userService.signUp(name, email, password);
      if (user) {
        //set the global user
        let error = await mealsGlobals?.setUser(user, false);
        if (error && error.length > 0) {
          console.error("Error setting user");
          console.error(error);
          //TODO: show error - 'Error setting user'
          setErrorMessage(error);
          togglePopUp();
        } else {
          //set the currentUser Cookie
          cookieManager.setCookie(Constants.mealUserCookie, email);
          const userId = user.userId;
          //navigate to weekly
          router.push(`/LumiMeals/${userId}/weekly`);
        }
      } else {
        //TODO: show error - 'Error signing up'
        console.error("Error signing up");
        setErrorMessage("Error signing up");
        togglePopUp();
        console.error(error);
        if (error === "Email already used") {
          console.log("Email already exists, please use another email");
        } else if (error === "Failed to add User") {
          console.error("Error adding user");
        } else if (error === "Bad Request") {
          console.log("We sent bad data");
        }
      }
    }
    setSignUpText("Sign Up");
  }

  async function signUpFundraising(fields: any) {
    let name = fields.target.nameInput?.value;
    let email = trimEmail(fields.target.emailInput?.value).toLowerCase().trim();
    let password = fields.target.passwordInputSignUp?.value?.toLowerCase().trim(); //cryptr.encrypt(fields.target.passwordInputSignUp?.value);
    let [user, error] = await fundraiserUserService.signUp(name, email, password);
    if (user) {
      //set the global user
      let error = await fundGlobals?.setCoach(user, false);
      if (error && error.length > 0) {
        console.error("Error setting user");
        console.error(error);
        //TODO: show error - 'Error setting user'
        setErrorMessage(error);
        togglePopUp();
      } else {
        //set the currentUser Cookie
        cookieManager.setCookie(DonationConstants.fundCoachCookie, name);
        const userId = user.userId;
        //navigate to home page
        router.push(`/LumiFundraising/fundraisers`);
      }
    } else {
      //TODO: show error - 'Error signing up'
      console.error("Error signing Coach up");
      console.error(error);
      setErrorMessage("Error signing Coach up: " + error);
      togglePopUp();
      if (error === "Email already used") {
        console.log("Email already exists, please use another email");
      } else if (error === "Failed to add User") {
        console.error("Error adding user");
      } else if (error === "Bad Request") {
        console.log("We sent bad data");
      }
    }
    ("Sign up");
  }

  /**
   * SignIn on click method
   * @param fields array of inputs
   */
  async function signIn(fields: any) {
    setLoginText("Loading...");
    if (product === "LumiFundraising") {
      signInFundraising(fields);
    } else if (product === "LumiMeals") {
      let email = trimEmail(fields.target.emailInput?.value).toLowerCase().trim();
      let password = fields.target.passwordInput?.value; //cryptr.encrypt(fields.target.passwordInput?.value);
      let [user, error] = await userService.signIn(email, password);
      if (user) {
        //set the global user
        let error = await mealsGlobals?.setUser(user, false);
        if (error && error.length > 0) {
          //TODO:show error - 'Error setting user'
          setErrorMessage(error);
          togglePopUp();
        } else {
          //set the currentUser Cookie
          cookieManager.setCookie(Constants.mealUserCookie, email);
          const userId = user.userId;
          //navigate to weekly
          router.push(`/LumiMeals/${userId}/weekly`);
        }
      } else {
        //TODO: show error - 'Error signing in'
        setErrorMessage("Error signing in: " + error);
        togglePopUp();
        console.error(error);
        if (error === "Could not find user") {
          console.log("User does not exist");
        } else if (error === "Bad request bud") {
          console.log("We sent bad data");
        } else if (error === "Password does not match") {
          console.log("Wrong password, try again");
        }
      }
    }
    setLoginText("Sign In");
  }

  async function signInFundraising(fields: any) {
    let name: string;
    let password: string;
    if (!isCoach) {
      //Athlete login
      name = fields.target.athleteId?.value.toLowerCase().trim();
      password = fields.target.fundraiserId?.value.toLowerCase().trim();
    } else {
      //Coach login
      name = trimEmail(fields.target.emailInput?.value).toLowerCase().trim();
      password = fields.target.passwordInput?.value; //cryptr.encrypt(fields.target.passwordInput?.value);
    }
    let [user, error] = await fundraiserUserService.signIn(
      name,
      password,
      isCoach
    );
    if (user) {
      let error2;
      //set the global user
      if (!isCoach) {
        error2 = await fundGlobals?.setAthlete(user as Athlete, false);
      } else {
        error2 = await fundGlobals?.setCoach(user as Coach, false);
      }
      if (error2 && error2.length > 0) {
        //TODO:show error2 - 'Error setting user'
        setErrorMessage(error2);
        togglePopUp();
      } else {
        //navigate to home page
        if (isCoach) {
          router.push(`/LumiFundraising/fundraisers`);
        } else {
          router.push(`/LumiFundraising/athletes/${password}/${name}`);
        }
      }
    } else {
      //TODO: show error - 'Error signing in'
      setErrorMessage("Error signing in: " + error);
      togglePopUp();
      console.error(error);
      if (error === "Could not find user") {
        console.log("User does not exist");
      } else if (error === "Bad request bud") {
        console.log("We sent bad data");
      } else if (error === "Password does not match") {
        console.log("Wrong password, try again");
      }
    }
  }

  /**
   * remove ".", "#", "$", "[", or "]" from email
   * @param email inputted email
   */
  function trimEmail(email: string): string {
    return email
      .replaceAll(".", "")
      .replaceAll("#", "")
      .replaceAll("$", "")
      .replaceAll("[", "")
      .replaceAll("]", "");
  }

  /**
   * Selects which login view to show
   */
  function getLogInView(): import("react").ReactNode {
    if (product === "LumiFundraising" && !isCoach) {
      return <AthleteLogin />;
    }
    return <NormalLogin />;
  }

    /**
   * Selects which sign up view to show
   */
    function getSignUpView(): import("react").ReactNode {
      return <NormalSignUp />;
    }

  return (
    <div className={styles.login}>
      {/* Popup failure message */}
      <AlertPopUp
        showPopUP={showPopUP}
        togglePopUp={togglePopUp}
        title="Error"
        good={false}
        message={errorMessage}
      />
      <div
        className={`${styles.coloredContainer} 
          ${login ? styles.coloredContainerLeft : styles.coloredContainerRight}
        `}
      ></div>
      <div
        className={`${styles.welcome}
          ${login ? styles.welcome_Active : styles.welcome_Inactive}`}
      >
        <div className={styles.welcomeLogoContainer}>
          <Image className={styles.logo} src={logo} alt="Company Logo" />
          Luminescence Software
        </div>
        <div className={styles.welcomeMainContainer}>
          <div className={styles.welcomeMainContainerTextContainer}>
            <span className={styles.welcomeMainContainerTextContainerTitle}>
              Welcome Back!
            </span>
            <span className={styles.welcomeMainContainerTextContainerSecondary}>
              If you already have an account, please log in.
            </span>
          </div>
          <div
            onClick={() => {
              setLogin(!login);
            }}
            className={styles.welcomeMainContainerButtonContainer}
          >
            Sign In
          </div>
        </div>
      </div>
      <div
        className={`${styles.createContainer}
          ${
            login
              ? styles.createContainer_Active
              : styles.createContainer_Inactive
          }`}
      >
        {/* //TODO Switch Products */}
        {/* <Link
          href={{
            pathname:
              product === "LumiFundraising"
                ? "/LumiMeals/login"
                : "/LumiFundraising/login",
          }}
        >
          <button className={styles.switchButtonSignUp}>Switch Products</button>
        </Link> */}
        Create Account
        {/* 
        //TODO: add external logins
        <div className={styles.socialContainer}>
          <Image
            className={styles.facebook}
            src={facebook}
            alt="Facebook Link"
          />
          <Image className={styles.google} src={google} alt="google Link" />
          <Image
            className={styles.linkedIn}
            src={linkedin}
            alt="linkedin Link"
          />
        </div>
        <span className={styles.createContainerInfoText}>
          or use email for your registration
        </span> */}
        <div
          className={styles.userDefineText}
          hidden={product !== "LumiFundraising"}
        >
          Coaches Only
        </div>
        <div className={styles.createContainerFormContainer}>
          <form
            className={styles.createContainerFormContainerForm}
            onSubmit={(e) => {
              setSignUpText("Loading...");
              e.preventDefault();
              signUp(e);
            }}
          >
            {getSignUpView()}
            <button className={styles.createContainerFormContainerFormSubmit} >
              {signUpText}
            </button>
          </form>
        </div>
      </div>
      <div
        className={`${styles.loginContainer}
          ${
            !login
              ? styles.loginContainer_Active
              : styles.loginContainer_Inactive
          }`}
      >
        {/* //TODO Switch Products */}
        {/* <Link
          href={{
            pathname:
              product === "LumiFundraising"
                ? "/LumiMeals/login"
                : "/LumiFundraising/login",
          }}
        >
          <button className={styles.switchButtonLogIn}>Switch Products</button>
        </Link>
        <button className={styles.switchButtonLogIn}>Switch Products</button> */}
        <div className={styles.loginContainerLogoContainer}>
          <Image className={styles.logo} src={logo} alt="Company Logo" />
          Luminescence Software
        </div>
        <div className={styles.loginContainerMainContainer}>
          {/* 
          //TODO: add external logins
          <div className={styles.socialContainer}>
            <Image
              className={styles.facebook}
              src={facebook}
              alt="Facebook Link"
            />
            <Image className={styles.google} src={google} alt="google Link" />
            <Image
              className={styles.linkedIn}
              src={linkedin}
              alt="linkedin Link"
            />
          </div>
          <span className={styles.loginContainerMainContainerInfoText}>
            or use email for your login
          </span> */}
          <div
            className={styles.userDefineText}
            hidden={product !== "LumiFundraising"}
          >
            {isCoach ? "Logging in as Coach" : "Logging in as Athlete"}
          </div>
          <button
            onClick={() => {
              setIsCoach(!isCoach);
            }}
            className={styles.switchUserButton}
            hidden={product !== "LumiFundraising"}
          >
            {isCoach ? "Switch to Athlete Sign in" : "Switch to Coach Sign in"}
          </button>
          <div className={styles.loginContainerMainContainerFormContainer}>
            <form
              className={styles.loginContainerMainContainerFormContainerForm}
              onSubmit={(e) => {
                setLoginText("Loading...");
                e.preventDefault();
                signIn(e);
              }}
            >
              {getLogInView()}
              {/* //TODO: Forgot password */}
              {/* <Link
                href={{
                  pathname:
                    product === "LumiFundraising"
                      ? "/LumiFundraising/ForgotPassword"
                      : "/LumiMeals/ForgotPassword",
                }}
              >
                Forgot Password?
              </Link> */}
              <button
                className={
                  styles.loginContainerMainContainerFormContainerFormSubmit
                }
              >
                {loginText}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`${styles.helloContainer}
          ${
            !login
              ? styles.helloContainer_Active
              : styles.helloContainer_Inactive
          }`}
      >
        <div className={styles.welcomeMainContainerTextContainer}>
          <span className={styles.welcomeMainContainerTextContainerTitle}>
            Hello, stranger!
          </span>
          <span className={styles.welcomeMainContainerTextContainerSecondary}>
            Click here to create a new Coaches account!
          </span>
        </div>
        <div
          onClick={() => {
            setLogin(!login);
          }}
          className={styles.welcomeMainContainerButtonContainer}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Login;
