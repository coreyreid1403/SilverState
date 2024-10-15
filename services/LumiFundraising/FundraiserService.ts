import Coach from '../../models/LumiFundraising/Users/Coach';
import Donation from '../../models/LumiFundraising/Donation';
import Fundraiser from '../../models/LumiFundraising/Fundraiser';
import { BaseFundraiserType } from '../../models/LumiFundraising/TypeProperties/BaseFundraiserTypeProperties';
import RaffleProperties from '../../models/LumiFundraising/TypeProperties/RaffleProperties';
import StudentRaffleProperties from '../../models/LumiFundraising/TypeProperties/StudentRaffleProperties';
import { FundraiserTypes } from '../../models/LumiFundraising/enums';
import DonationConstants from '../../util/LumiFundraising/DonationConstants';
import AthleteService from './AthleteService';
import DonationService from './DonationService';

export default class FundraiserService {
  athleteService = new AthleteService();
  donationService = new DonationService();
  /**
   * Adds new Fundraiser to database
   * @returns
   */
  public async createFundraiser(fundraiser: Fundraiser): Promise<string> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointCreateFundraiser,
      {
        method: 'POST',
        body: JSON.stringify({ fundraiser })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return '';
    }
    console.error('Error with making Fundraiser: ');
    console.log(posts);
    return posts.error;
  }

  async getFundraiser(
    fundraiserId: string
  ): Promise<[Fundraiser | undefined, string]> {
    if (fundraiserId && typeof fundraiserId === 'string') {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.endpointGetFundraiser,
        {
          method: 'POST',
          body: JSON.stringify({ fundraiserId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        const fund = this.fixJsonDateIssue(posts.fundraiser);
        return [fund, ''];
      }
      console.error('Error getting fundraiser: ');
      console.log(posts);
      return [undefined, posts.error];
    }
    return [undefined, 'Bad fundraiser name'];
    //TODO: Error message about not finding fundraiser
  }

  async updateFundraiser(fundraiser: Fundraiser): Promise<string> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointUpdateFundraiser,
      {
        method: 'POST',
        body: JSON.stringify({ fundraiser })
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return '';
    }
    console.error('Error with updating Fundraiser: ');
    console.log(posts);
    return posts.error;
  }

  async getAllCoachesFundraisers(coach: Coach): Promise<Fundraiser[]> {
    let fundIds = coach.fundraisersIds;
    if (fundIds) {
      const res = await fetch(
        DonationConstants.baseURL +
          DonationConstants.endpointGetAllFundraisersFromIds,
        {
          method: 'POST',
          body: JSON.stringify({ fundIds })
        }
      );
      const posts = await res.json();
      const funds = this.fixJsonDateIssueList(posts.fundraisers);
      return funds;
    }
    return [];
  }

  fixJsonDateIssueList(funds: Fundraiser[]): Fundraiser[] {
    return funds.map(fund => {
      return this.fixJsonDateIssue(fund);
    });
  }

  /**
   * JSON is returning dates as strings. so converting
   * @param fund
   * @returns
   */
  fixJsonDateIssue(fund: Fundraiser): Fundraiser {
    if (fund.startDate) {
      fund.startDate = new Date(fund.startDate);
    }
    if (fund.endDate) {
      fund.endDate = new Date(fund.endDate);
    }
    if (fund.fullyPaidOutDate) {
      fund.fullyPaidOutDate = new Date(fund.fullyPaidOutDate);
    }
    return fund;
  }

  /**
   * Processes Images for usage
   * @returns
   */
  public async processImage(formData: FormData): Promise<[string]> {
    formData.append('coach', 'Boo');
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointProcessImage,
      {
        method: 'POST',
        body: formData
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      return [''];
    }
    console.error('Error with making Fundraiser: ');
    console.log(posts);
    return [posts.error];
  }

  /**
   * Given %, returns the progress bar color
   * @returns string of the color type
   */
  getDonationProgressBarColor(percentage: string) {
    const percentageAsNumber = Number(percentage);
    if (percentageAsNumber < 50) {
      return 'danger';
    }
    if (percentageAsNumber < 75) {
      return 'warning';
    }
    return 'success';
  }

  /**
   * Gets team id from name
   * @returns
   */
  public getTeamId(name: string): string {
    const teams = DonationConstants.TeamsMap;
    const teamId = teams.get(name);
    if (teamId && teamId.length > 0) {
      return teamId;
    }
    console.error('Error, Could not find team: ' + name);
    return '';
  }

  getAmountCollectedByDonations(donations: Donation[]) {
    let collected = 0.0;
    donations?.map(donation => {
        collected += donation.amount;
    });
    return Math.round(collected * 100) / 100;
  }

  async getTotalAmountCollected(fundraiserId: string | undefined) {
    if (fundraiserId) {
      let [donations, error] =
        await this.donationService.getDonationsByFundraiser(fundraiserId);
      if (donations.length > 0) {
        return this.getAmountCollectedByDonations(donations);
      }
    }
    return 0;
  }

  IsPaidOut(fundraiser: Fundraiser): string {
    if (new Date() >= fundraiser.startDate) {
      if (fundraiser.endDate && new Date() >= fundraiser.endDate) {
        if (fundraiser.fullyPaidOutDate && new Date() >= fundraiser.fullyPaidOutDate) {
          return 'Paid Out';
        }
        return 'Waiting on card payments';
      }
      return 'In Progress';
    }
    return 'Not Started';
  }

  async getActiveFundraisers() {
    //TODO: eventually update to get active in db call
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.endpointGetAllFundraisers,
      {
        method: 'POST'
      }
    );
    const posts = await res.json();
    let fundraisers: Fundraiser[] = this.fixJsonDateIssueList(
      posts.fundraisers
    );
    let now = new Date();
    let filtered = fundraisers.filter(
      fund => fund.startDate < now && !fund.endDate
    );
    return filtered;
  }

  IsFundraiserType(fundraiser: Fundraiser, type: FundraiserTypes): boolean {
    return !!((fundraiser?.type ?? 0) & type);
  }

  getRaffleProperties(
    fundraiserProperties: BaseFundraiserType[]
  ): RaffleProperties | undefined {
    let prop = fundraiserProperties?.find(props => {
      return props.type === FundraiserTypes.Raffle;
    });
    if (prop) {
      const toUnknown: unknown = prop;
      const raffle = toUnknown as RaffleProperties;
      return raffle;
    }
    return undefined;
  }

  getStudentRaffleProperties(
    fundraiserProperties: BaseFundraiserType[]
  ): StudentRaffleProperties | undefined {
    let prop = fundraiserProperties?.find(props => {
      return props.type === FundraiserTypes.StudentRaffle;
    });
    if (prop) {
      const toUnknown: unknown = prop;
      const raffle = toUnknown as StudentRaffleProperties;
      return raffle;
    }
    return undefined;
  }
}
