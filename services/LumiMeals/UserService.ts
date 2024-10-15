import { Constants } from "../../util/LumiMeals/Constants";
import { User } from "../../models/LumiMeals/User/User";
import { CookieManager } from "../../managers/CookieManager";

export class UserService {
  cookieManager = new CookieManager();
  //#region Sign in / Sign up
  /**
   * Signs up a user.
   * @returns if can sign up
   */
  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<[User | undefined, string]> {
    const res = await fetch(Constants.baseURL + Constants.endpointSignUp, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      const [user, error] = await this.getUser(email);
      if (user && error.length === 0) {
        return [user, ""];
      } else {
        return [undefined, error];
      }
    }
    console.error("Error Signing up: ");
    console.log(posts);
    return [undefined, posts.error];
  }

  /**
   * Checks if user can sign in, then does
   * @returns if signed in or not
   */
  public async signIn(
    email: string,
    password: string
  ): Promise<[User | undefined, string]> {
    const res = await fetch(Constants.baseURL + Constants.endpointSignIn, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      const [user, error] = await this.getUser(email);
      if (user && error.length === 0) {
        return [user, ""];
      }
    }
    console.error("Error signing in: ");
    console.log(posts);
    return [undefined, posts.error];
  }
  //#endregion

  /**
   * Gets user
   * @returns [user|undefined, error]
   */
  public async getUser(email: string): Promise<[User | undefined, string]> {
    const res = await fetch(
      Constants.baseURL + Constants.endpointGetUser,
      {
        method: "POST",
        body: JSON.stringify({ email }),
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return [posts.user, ""];
    }
    console.error("Error getting user: ");
    console.log(posts);
    return [undefined, posts.error];
  }

  /**
   * Updates user **Update Global User before Using**
   * @returns Error, empty if none
   */
  public async updateUser(user: User): Promise<string> {
    //set cookie
    this.cookieManager.setCookie(Constants.mealUserCookie, user?.email);
    //set database
    const res = await fetch(
      Constants.baseURL + Constants.endpointUpdateUser,
      {
        method: "POST",
        body: JSON.stringify({ user }),
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return "";
    }
    console.error("Error updating user: ");
    console.log(posts);
    return posts.error;
  }
}
