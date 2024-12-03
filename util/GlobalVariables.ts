import { CookieManager } from "../managers/CookieManager";
import { BaseUser } from "../models/BaseUser";
import Cart from "../models/Cart";
import UserService from "../services/UserService ";
import Constants from "./Constants";

export default class GlobalVariables {
  cookieManager = new CookieManager();
  userService = new UserService()

  static instance?: GlobalVariables = undefined;

  private user?: BaseUser;
  private cart: Cart = new Cart('', '', new Map(), '');
  public testMode: boolean = Constants.testMode;

  /**
   * Used to get the globals class
   * @returns globals class
   */
  static getInstance() {
    if (!GlobalVariables.instance) {
      GlobalVariables.instance = new GlobalVariables();
    }
    return this.instance;
  }

  /**
   * Sets the current user, updated database if needed
   * @param user Current user
   * @param update If there was an update that need to be pushed to database
   */
  async setUser(
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

  async getUser(): Promise<BaseUser | undefined> {
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

    /**
   * Sets the current cart
   * @param user Current cart
   */
    async setCart(
      cart: Cart | undefined
    ): Promise<string> {
      if (cart) {
        this.cart = cart;
        //Set Cookie
        this.cookieManager.setCookie(
          Constants.cartCookie,
          JSON.stringify(this.cart)
        );
        return '';
      }
      return 'Cart undefined';
    }
  
    getCart(): Cart{
      if (!this.cart) {
        if (this.cookieManager.hasCookie(Constants.cartCookie)) {
          let cartString = this.cookieManager
            .getCookie(Constants.cartCookie)
            ?.toString();
          if(cartString){
            let cart: Cart = JSON.parse(cartString);
            this.cart = cart;
          }
        }
      }
      return this.cart;
    }

  toggleTestMode() {
    this.testMode = !this.testMode;
  }
}
