import DonationConstants from "../../util/LumiFundraising/DonationConstants";
import Coach from "../../models/LumiFundraising/Users/Coach";

export default class CoachService {
  /**
   * Adds fundraiser id
   * checks to make sure array isn't' null
   * @param fundraiser 
   * @param coach 
   */
  public addFundraiserId(id: string, coach: Coach) {
    if (!coach.fundraisersIds) {
      coach.fundraisersIds = [];
    }
    coach.fundraisersIds.push(id);
    this.updateCoach(coach);
  }

  /**
 * Checks if user can sign in, then does
 * @returns if signed in or not
 */
  public async signIn(
    email: string,
    password: string
  ): Promise<[Coach | undefined, string]> {
    const res = await fetch(DonationConstants.baseURL + DonationConstants.endpointSignInCoach, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      const [user, error] = await this.getCoach(email);
      if (user && error.length === 0) {
        return [user, ""];
      }
    }
    console.error("Error signing in: ");
    console.log(posts);
    return [undefined, posts.error];
  }

  async getCoach(coachEmail: any): Promise<[Coach | undefined, string]> {
    if (coachEmail && typeof coachEmail === 'string') {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetCoach,
        {
          method: "POST",
          body: JSON.stringify({ coachEmail }),
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return [posts.user, ""];
      }
      return [undefined, posts.error];
    }
    return [undefined, "Bad Coaches Email"];
    //TODO: Error message about not finding Coach
  }

  async updateCoach(coach: Coach): Promise<string> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointUpdateCoach,
      {
        method: "POST",
        body: JSON.stringify({ coach }),
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return "";
    }
    console.error("Error with updating coach: ");
    console.log(posts);
    return posts.error;
  }

  async addOrganizationToCoach(coachEmail: string, team: string): Promise<string> {
    let [coach, error] = await this.getCoach(coachEmail);
    if (coach) {
      if (!coach.teams) {
        coach.teams = [];
      }
      coach.teams.push(team);
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointUpdateCoach,
        {
          method: "POST",
          body: JSON.stringify({ coach }),
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return "";
      }
      console.error("Error with updating coach: ");
      console.log(posts);
      return posts.error;
    }
    return error
  }
}
