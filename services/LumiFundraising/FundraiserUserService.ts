import { CookieManager } from '../../managers/CookieManager';
import Athlete from '../../models/LumiFundraising/Users/Athlete';
import Coach from '../../models/LumiFundraising/Users/Coach';
import DonationConstants from '../../util/LumiFundraising/DonationConstants';

export default class FundraiserUserService {
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
  ): Promise<[Coach | undefined, string]> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointSignUpCoach,
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      const [user, error] = await this.getUser(email, '', true);
      if (user && error.length === 0) {
        return [user as Coach, ''];
      } else {
        return [undefined, error];
      }
    }
    console.error('Error Signing up: ');
    console.log(posts);
    return [undefined, posts.error];
  }

  /**
   * Sign in for fundraising
   * @param userName Email if coach, full name if athlete
   * @param password password if coach, pass code if athlete
   * @param isCoach if it is a coach
   * @returns
   */
  public async signIn(
    userName: string,
    password: string,
    isCoach: boolean
  ): Promise<[Coach | Athlete | undefined, string]> {
    let res;
    if (isCoach) {
      res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointSignInCoach,
        {
          method: 'POST',
          body: JSON.stringify({ email: userName, password })
        }
      );
    } else {
      res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointSignInAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ athleteId: userName, fundraiserId: password })
        }
      );
    }
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      if (isCoach) {
        return [posts.coach, ''];
      } else {
        return [posts.athlete, ''];
      }
    }
    console.error('Error signing in: ');
    console.log(posts);
    return [undefined, posts.error];
  }
  //#endregion

  /**
   * Gets user
   * @returns [user|undefined, error]
   */
  public async getUser(
    email: string,
    password: string,
    isCoach: boolean
  ): Promise<[Coach | Athlete | undefined, string]> {
    let res;
    if (isCoach) {
      res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetCoach,
        {
          method: 'POST',
          body: JSON.stringify({ coachEmail: email })
        }
      );
    } else {
      res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ athleteId: email, fundraiserId: password })
        }
      );
    }
    const posts = await res.json();
    //TODO: will get all athletes
    if (res.status === 200 && posts.error.length === 0) {
      return [posts.user, ''];
    }
    console.error('Error getting Coach/Athlete: ');
    console.log(posts);
    return [undefined, posts.error];
  }
}
