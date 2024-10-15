import DonationConstants from '../../util/LumiFundraising/DonationConstants';
import Athlete from '../../models/LumiFundraising/Users/Athlete';
import Donation from '../../models/LumiFundraising/Donation';
import { read, utils } from 'xlsx';
import StudentRaffleProperties from '../../models/LumiFundraising/TypeProperties/StudentRaffleProperties';

export default class AthleteService {
  /**
   * Adds new Athlete to database
   * @returns
   */
  public async createAthlete(
    athlete: Athlete,
    fundraiserId: string
  ): Promise<string> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointCreateAthlete,
      {
        method: 'POST',
        body: JSON.stringify({ athlete, fundraiserId })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return '';
    }
    console.error('Error with making athlete: ');
    console.log(posts);
    return posts.error;
  }

  /**
   * Checks if user can sign in, then does
   * @returns if signed in or not
   */
  public async signIn(
    athleteId: string,
    fundraiserId: string
  ): Promise<[Athlete | undefined, string]> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointSignInAthlete,
      {
        method: 'POST',
        body: JSON.stringify({ athleteId, fundraiserId })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return [posts.athlete, ''];
    }
    console.error('Error signing in: ');
    console.log(posts);
    return [undefined, posts.error];
  }

  async getAthlete(
    athleteId: string | undefined,
    fundraiserId: string | undefined
  ): Promise<[Athlete | undefined, string]> {
    if (athleteId && fundraiserId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ fundraiserId, athleteId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return [posts.athlete, ''];
      }
      console.error('Error getting athlete: ');
      console.log(posts);
      return [undefined, posts.error];
    }
    //TODO: Error message about not finding athlete
    return [undefined, 'Bad Athlete id'];
  }

  public async getAthleteName(
    donatorId: string,
    fundraiserId: string
  ): Promise<string> {
    const[athlete, error] = (await this.getAthlete(donatorId, fundraiserId));
    return athlete?.name ?? '';
  }

  async getAthletesByFundraiserId(fundraiserId: string): Promise<[Athlete[], string]> {
    if (fundraiserId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetAthletes,
        {
          method: 'POST',
          body: JSON.stringify({ fundraiserId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return [posts.athletes, ''];
      }
      console.error('Error getting athletes: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null fundraiser Id'];
  }

  async updateAthlete(athlete: Athlete): Promise<string> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointUpdateAthlete,
      {
        method: 'POST',
        body: JSON.stringify({ athlete })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return '';
    }
    console.error('Error with updating Athlete: ');
    console.log(posts);
    return posts.error;
  }

  /**
   * Removes athlete and updated fundraiser
   * @param fundraiser
   * @param athletesToAdd
   */
  async removeAthlete(fundraiserId: string, athleteId: string) {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointDeleteAthlete,
      {
        method: 'POST',
        body: JSON.stringify({ athleteId, fundraiserId })
      }
    );
    const posts = await res.json();
    if (res.status !== 200 || posts.error.length !== 0) {
      console.log('Issue deleting athlete');
      console.log(posts);
    }
  }

  /**
   * Calculated the amount this athlete has received.
   * @returns total amount received by athlete
   */
  async getDonationsValueFromDonations(donations: Donation[]) {
    let totalDonated = donations.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);
    return Math.round(totalDonated * 100) / 100;;
  }

  /**
   * Calculated the percentage of the goal total the athlete has received
   * With value known
   */
  async getPercentageCompleteWithValue(
    athlete: Athlete,
    donationValue: number
  ): Promise<string> {
    return Math.round(
      (donationValue / athlete.fundraiserAthleteGoal) * 100
    ).toString();
  }

  /**
   * Given list of athletes and fundraisers donations, sorts into a map
   * @param athletes 
   * @param donations 
   */
  sortDonationsToAthletes(athletes: Athlete[], donations: Donation[]): Map<string, Donation[]> {
    const athleteDonationMap = new Map();
    athletes.forEach(athlete =>
      athleteDonationMap.set(
        athlete.userId,
        donations.filter(donation => donation.athleteId === athlete.userId)
      )
    );
    return athleteDonationMap;
  }

  addViaExcel(fundraiserId: string, athleteGoal: number, file: any, setRefresh: Function ) {
    // Create a new FileReader object
    const reader = new FileReader();

    // Read the file contents into a string
    reader.onload = async file => {
      // Parse the contents as an excel file
      const workbook = read(file.target?.result, { type: 'binary' });

      // Get names from each sheet and add to set
      let athletesNames: Set<string> = new Set();
      workbook.SheetNames.forEach(function (sheetName) {
        utils
          .sheet_to_csv(workbook.Sheets[sheetName])
          .split('\n')
          .forEach(item => athletesNames.add(item.substring(0, item.indexOf(",")).trim()));
      });
      let [currentAthletes, error] = await this.getAthletesByFundraiserId(fundraiserId);
      let currentAthletesNames = currentAthletes.map(athlete => {
        return athlete.name;
      });

      //loop through each name on that sheet
      athletesNames.forEach(name => {
        if (
          this.validateAthleteName(
            currentAthletesNames,
            name
          )
        ) {
          let athlete = new Athlete(
            name,
            fundraiserId,
            athleteGoal
          );
          this.createAthlete(athlete, fundraiserId);
        }
      });
      setRefresh(true);
    };

    // Read the file
    reader.readAsArrayBuffer(file);
  }

  async calculateTickets(
    donations: Donation[],
    fundProperties: StudentRaffleProperties | undefined,
    fundraiserId: string | undefined
  ) {
    if (fundraiserId && fundProperties && fundProperties.pricePerTicket) {
      const donationValue = await this.getDonationsValueFromDonations(donations);
      return Math.floor(donationValue / fundProperties.pricePerTicket);
    }
    return 0;
  }

  async calculateAthleteTickets(
    athleteId: string,
    fundProperties: StudentRaffleProperties | undefined,
    donations: Map<string, Donation[]>
  ) {
    if (fundProperties && fundProperties.pricePerTicket) {
      const athleteDonations = donations.get(athleteId) ?? [];
      const donationValue = await this.getDonationsValueFromDonations(athleteDonations);
      return Math.floor(donationValue / fundProperties.pricePerTicket);
    }
    return 0;
  }

  validateAthleteName(currentAthletesNames: string[], name: string): boolean {
    //One letter followed by any non-digit, space, one letter followed by 1-25 non-digits
    if (/^\w\D*\s+\w\D{1,25}$/.test(name)) {
      //check to not add repeats
      if (!currentAthletesNames.includes(name)) {
        return true;
      }
    }
    return false;
  }
}
