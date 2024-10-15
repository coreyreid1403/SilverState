import { CookieManager } from "../../managers/CookieManager";
import { User } from "../../models/LumiMeals/User/User";
import { UserService } from "../../services/LumiMeals/UserService";
import { Constants } from "./Constants";

export default class GlobalVariables {
  cookieManager = new CookieManager();
  userService = new UserService();

  static instance?: GlobalVariables = undefined;

  private user?: User;

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
    user: User | undefined,
    update: boolean = true
  ): Promise<string> {
    console.log("setting user");
    if (user) {
      const updateEmail = this.user?.email !== user.email;
      this.user = user;
      //if we updated the user, update the database
      if (update) {
        console.log("updating user");
        const error = await this.userService.updateUser(user);
        if (error.length !== 0) {
          console.error("Error updating user: ");
          console.error(error);
          return error;
        }
        //if it was a email update, update the cookie
        if (updateEmail) {
          console.log("updating email");
          this.cookieManager.setCookie(Constants.mealUserCookie, this.user.email);
        }
      }
      return "";
    }
    return "User undefined";
  }

  async getUser(): Promise<User | undefined> {
    if (!this.user) {
      if (this.cookieManager.hasCookie(Constants.mealUserCookie)) {
        let userEmail = this.cookieManager
          .getCookie(Constants.mealUserCookie)
          ?.toString();
        //If cookie exists, get user based on cookie email
        if (userEmail) {
          let [user, error] = await this.userService.getUser(userEmail);
          if (user && error.length === 0) {
            this.user = user;
            console.log("got user from Cookie");
          } else {
            console.error("Error with getting user from cookie email: ");
            console.error(error);
          }
        }
      }
      else{
        console.log("No cookie, must sign in");
      }
    } else {
      // console.log("User was cached");
    }
    //if no recipes, make empty array
    if (this.user && !this.user.recipes) {
      this.user.recipes = [];
    }
    return this.user;
  }
}
