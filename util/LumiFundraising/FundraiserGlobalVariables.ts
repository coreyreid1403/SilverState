import { CookieManager } from '../../managers/CookieManager';
import Athlete from '../../models/LumiFundraising/Users/Athlete';
import Coach from '../../models/LumiFundraising/Users/Coach';
import AthleteService from '../../services/LumiFundraising/AthleteService';
import CoachService from '../../services/LumiFundraising/CoachService ';
import { Constants } from '../LumiMeals/Constants';
import DonationConstants from './DonationConstants';

export default class FundraiserGlobalVariables {
  cookieManager = new CookieManager();
  athleteService = new AthleteService();
  coachService = new CoachService();

  static instance?: FundraiserGlobalVariables = undefined;

  private coachUser?: Coach;
  private athleteUser?: Athlete;
  public testMode: boolean = Constants.testMode;

  /**
   * Used to get the globals class
   * @returns globals class
   */
  static getInstance() {
    if (!FundraiserGlobalVariables.instance) {
      FundraiserGlobalVariables.instance = new FundraiserGlobalVariables();
    }
    return this.instance;
  }

  /**
   * Sets the current user, updated database if needed
   * @param user Current user
   * @param update If there was an update that need to be pushed to database
   */
  async setCoach(
    user: Coach | undefined,
    update: boolean = true
  ): Promise<string> {
    if (user) {
      //remove any athlete
      this.cookieManager.deleteCookie(DonationConstants.fundAthleteCookie);
      this.athleteUser = undefined;

      this.coachUser = user;
      //Set Cookie
      this.cookieManager.setCookie(
        DonationConstants.fundCoachCookie,
        this.coachUser.email
      );
      //if we updated the user, update the database
      if (update) {
        const error = await this.coachService.updateCoach(user);
        if (error.length !== 0) {
          console.error('Error updating user: ');
          console.error(error);
          return error;
        }
      }
      return '';
    }
    return 'User undefined';
  }

  /**
   * Sets the current user, updated database if needed
   * @param user Current user
   * @param update If there was an update that need to be pushed to database
   */
  async setAthlete(
    user: Athlete | undefined,
    update: boolean = true
  ): Promise<string> {
    if (user) {
      //remove any coach
      this.cookieManager.deleteCookie(DonationConstants.fundCoachCookie);
      this.coachUser = undefined;

      this.athleteUser = user;
      //set cookie
      this.cookieManager.setCookie(
        DonationConstants.fundAthleteCookie,
        this.athleteUser.userId + ',' + this.athleteUser.fundraiserId
      );
      //if we updated the user, update the database
      if (update) {
        const error = await this.athleteService.updateAthlete(user);
        if (error.length !== 0) {
          console.error('Error updating user: ');
          console.error(error);
          return error;
        }
      }
      return '';
    }
    return 'User undefined';
  }

  async getCoach(): Promise<Coach | undefined> {
    if (!this.coachUser) {
      if (this.cookieManager.hasCookie(DonationConstants.fundCoachCookie)) {
        let userEmail = this.cookieManager
          .getCookie(DonationConstants.fundCoachCookie)
          ?.toString();
        //If cookie exists, get user based on cookie email
        if (userEmail) {
          let [user, error] = await this.coachService.getCoach(userEmail);
          if (user && error.length === 0) {
            this.coachUser = user;
            console.log('got coach from Cookie');
          }
        }
      }
    } else {
      console.log('User was cached');
    }
    return this.coachUser;
  }

  async getAthlete(): Promise<Athlete | undefined> {
    if (!this.athleteUser) {
      if (this.cookieManager.hasCookie(DonationConstants.fundAthleteCookie)) {
        let athleteInfo = this.cookieManager
          .getCookie(DonationConstants.fundAthleteCookie)
          ?.toString();
        //If cookie exists, get user based on cookie email
        if (athleteInfo) {
          let [athleteId, fundraiserId] =
            this.splitAthleteCookieInfo(athleteInfo);
          let [user, error] = await this.athleteService.getAthlete(
            athleteId,
            fundraiserId
          );
          if (user && error.length === 0) {
            this.athleteUser = user;
            console.log('got athlete from Cookie');
          }
        }
      }
    } else {
      console.log('User was cached');
    }
    return this.athleteUser;
  }

  /**
   * Checks if user is logged in, then if it is a coach
   * @returns bool if coach, or undefined
   */
  async checkUser(): Promise<boolean | undefined> {
    if(this.cookieManager.hasCookie(DonationConstants.fundCoachCookie)){
      return true;
    }
    else if(this.cookieManager.hasCookie(DonationConstants.fundAthleteCookie)){
      return false;
    }
    else if(this.coachUser){
      return true;
    }
    else if(this.athleteUser){
      return false;
    }
    return undefined;
  }

  private splitAthleteCookieInfo(athleteInfo: string): [any, any] {
    let split = athleteInfo.split(',');
    return [split[0], split[1]];
  }

  toggleTestMode() {
    this.testMode = !this.testMode;
  }
}
