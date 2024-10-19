import { BaseUser } from "../models/BaseUser";
import Constants from "../util/Constants";

export default class UserService {
  /**
 * Checks if user can sign in, then does
 * @returns if signed in or not
 */
  public async signIn(
    email: string,
    password: string
  ): Promise<[BaseUser | undefined, string]> {
    const res = await fetch(Constants.baseURL + Constants.endpointSignInUser, {
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

    /**
 * Checks if user can sign in, then does
 * @returns if signed in or not
 */
    public async signUp(
      name: string,
      email: string,
      password: string
    ): Promise<[BaseUser | undefined, string]> {
      // const res = await fetch(Constants.baseURL + Constants.endpointSignUpUser, {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      // });
      // const posts = await res.json();
      // if (res.status === 200 && posts.error.length === 0) {
      //   const [user, error] = await this.getUser(email);
      //   if (user && error.length === 0) {
      //     return [user, ""];
      //   }
      // }
      // console.error("Error signing in: ");
      // console.log(posts);
      return [undefined,' posts.error'];
    }

  async getUser(UserEmail: any): Promise<[BaseUser | undefined, string]> {
    if (UserEmail && typeof UserEmail === 'string') {
      const res = await fetch(
        Constants.baseURL + Constants.endpointGetUser,
        {
          method: "POST",
          body: JSON.stringify({ UserEmail }),
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return [posts.user, ""];
      }
      return [undefined, posts.error];
    }
    return [undefined, "Bad Useres Email"];
    //TODO: Error message about not finding User
  }

  async updateUser(User: BaseUser): Promise<string> {
    const res = await fetch(
      Constants.baseURL + Constants.endpointUpdateUser,
      {
        method: "POST",
        body: JSON.stringify({ User }),
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return "";
    }
    console.error("Error with updating User: ");
    console.log(posts);
    return posts.error;
  }
}
