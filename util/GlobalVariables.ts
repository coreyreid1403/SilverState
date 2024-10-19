import { CookieManager } from "../managers/CookieManager";
import { BaseUser } from "../models/BaseUser";
import UserService from "../services/UserService ";
import Constants from "./Constants";

export default class FundraiserGlobalVariables {
  cookieManager = new CookieManager();
  userService = new UserService()

  static instance?: FundraiserGlobalVariables = undefined;

  private user?: BaseUser;
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
    user: BaseUser | undefined,
    update: boolean = true
  ): Promise<string> {
    if (user) {
      this.user = user;
      //Set Cookie
      this.cookieManager.setCookie(
        Constants.fundCoachCookie,
        this.user.email
      );
      //if we updated the user, update the database
      if (update) {
        const error = await this.userService.updateUser(user);
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

  async getCoach(): Promise<BaseUser | undefined> {
    if (!this.user) {
      if (this.cookieManager.hasCookie(Constants.fundCoachCookie)) {
        let userEmail = this.cookieManager
          .getCookie(Constants.fundCoachCookie)
          ?.toString();
        //If cookie exists, get user based on cookie email
        if (userEmail) {
          let [user, error] = await this.userService.getUser(userEmail);
          if (user && error.length === 0) {
            this.user = user;
            console.log('got user from Cookie');
          }
        }
      }
    } else {
      console.log('User was cached');
    }
    return this.user;
  }

  /**
   * Checks if user is logged in, then if it is a coach
   * @returns bool if coach, or undefined
   */
  async checkUser(): Promise<boolean | undefined> {
    if(this.cookieManager.hasCookie(Constants.fundCoachCookie)){
      return true;
    }
    else if(this.user){
      return true;
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
