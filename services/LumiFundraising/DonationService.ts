import Donation from '../../models/LumiFundraising/Donation';
import PackedDonation from '../../models/LumiFundraising/PackedDonation';
import DonationConstants from '../../util/LumiFundraising/DonationConstants';
import DonatorService from './DonatorService';
import EmailService from './EmailService';

export default class DonationService {
  donatorService = new DonatorService();
  emailService = new EmailService();

  /**
   * Adds new donation to database
   * @returns
   */
  public async createDonation(
    donatorName: string,
    donatorEmail: string,
    amount: number,
    athleteId: string,
    athleteName: string,
    fundraiserId: string,
    cash: boolean,
    bonusTicket: boolean = false,
    completed: boolean = false
  ): Promise<string> {
    let donatorId: string = await this.donatorService.newDonator(donatorName, donatorEmail);
    if (donatorId && donatorId.length > 0) {
      let donation = new Donation(
        donatorId,
        amount,
        athleteId,
        athleteName,
        fundraiserId,
        cash,
        bonusTicket,
        completed
      );
      try {
        const res = await fetch(
          DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointCreateDonation,
          {
            method: 'POST',
            body: JSON.stringify({ donation })
          }
        );
        const posts = await res.json();
        if (res.status !== 200 || posts.error.length !== 0) {
          console.error('Error with making donation: ' + posts);
          this.emailService.notifyOfError('Creating donation', posts.error, donation);
          return '';
        }
        return donation.donationId;
      }
      catch (e: any) {
        console.error('Caught Error in creating Donation: ' + e);
        this.emailService.notifyOfError('Creating donation error caught', e.toString(), donation);
        return '';
      }
    }
    console.log('Donator had issue getting created');
    return '';
  }

  async cancelDonation(donationId: string): Promise<string> {
    if (donationId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointRemoveDonation,
        {
          method: 'POST',
          body: JSON.stringify({ donationId })
        }
      );
      const posts = await res.json();
      if (res.status !== 200 || posts.error.length !== 0) {
        console.error('Error with removing donation: ' + posts);
        this.emailService.notifyOfError('cancel donation', posts.error, donationId);
        return posts.error;
      }
      return '';
    }
    return 'Undefined fundraiser id'
  }

  async getDonation(
    donationId: string | undefined
  ): Promise<[Donation | undefined, string]> {
    if (donationId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetDonation,
        {
          method: 'POST',
          body: JSON.stringify({ donationId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        const donation = this.fixJsonDateIssue(posts.donation);
        return [donation, ''];
      }
      console.error('Error getting donation by id: ');
      console.log(posts);
      return [undefined, posts.error];
    }
    return [undefined, 'Bad donation id'];
  }

  async getPackedDonation(
    donationId: string | undefined
  ): Promise<[PackedDonation | undefined, string]> {
    if (donationId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetPackedDonation,
        {
          method: 'POST',
          body: JSON.stringify({ donationId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        const donation = this.fixJsonDateIssuePacked(posts.donation);
        return [donation, ''];
      }
      console.error('Error getting packed donation by id: ');
      console.log(posts);
      return [undefined, posts.error];
    }
    return [undefined, 'Bad donation id'];
  }

  async getDonationsByIds(donationIds: string[] | undefined): Promise<[Donation[], string]> {
    if (donationIds && donationIds.length > 0) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetDonationsByIds,
        {
          method: 'POST',
          body: JSON.stringify({ donationIds })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let donations = this.fixJsonDateIssueList(posts.donations);
        return [donations, ''];
      }
      console.error('Error getting donations for ids: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null donationIds'];
  }

  async getPackedDonationsByIds(donationIds: string[] | undefined): Promise<[PackedDonation[], string]> {
    if (donationIds && donationIds.length > 0) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetPackedDonationsByIds,
        {
          method: 'POST',
          body: JSON.stringify({ donationIds })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let donations = this.fixJsonDateIssueListPacked(posts.donations);
        return [donations, ''];
      }
      console.error('Error getting packed donations for ids: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null donationIds'];
  }

  async getDonationsByAthlete(athleteId: string): Promise<[Donation[], string]> {
    if (athleteId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetDonationsByAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ athleteId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let donations = this.fixJsonDateIssueList(posts.donations);
        return [donations, ''];
      }
      console.error('Error getting donations for athlete: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null athleteId'];
  }

  async getDonationsByFundraiser(fundraiserId: string): Promise<[Donation[], string]> {
    if (fundraiserId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetDonationsByFundraiser,
        {
          method: 'POST',
          body: JSON.stringify({ fundraiserId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let donations = this.fixJsonDateIssueList(posts.donations);
        return [donations, ''];
      }
      console.error('Error getting donations for fundraiser: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null fundraiserId'];
  }

  async getPackedDonationsByFundraiser(fundraiserId: string): Promise<[PackedDonation[], string]> {
    if (fundraiserId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetPackedDonationsByFundraiser,
        {
          method: 'POST',
          body: JSON.stringify({ fundraiserId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let packedDonations = this.fixJsonDateIssueListPacked(posts.donations);
        return [packedDonations, ''];
      }
      console.error('Error getting packed donations for fundraiser: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null fundraiserId'];
  }

  async getPackedDonationsByAthlete(athleteId: string): Promise<[PackedDonation[], string]> {
    if (athleteId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetPackedDonationsByAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ athleteId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let packedDonations = this.fixJsonDateIssueListPacked(posts.donations);
        return [packedDonations, ''];
      }
      console.error('Error getting packed donations for athlete: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null athleteId'];
  }

  async getFailedPackedDonationsByAthlete(athleteId: string): Promise<[PackedDonation[], string]> {
    if (athleteId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetFailedPackedDonationsByAthlete,
        {
          method: 'POST',
          body: JSON.stringify({ athleteId })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        let packedDonations = this.fixJsonDateIssueListPacked(posts.donations);
        return [packedDonations, ''];
      }
      console.error('Error getting failed packed donations for athlete: ');
      console.log(posts);
      return [[], posts.error];
    }
    return [[], 'Null athleteId'];
  }

  fixJsonDateIssueListPacked(donations: PackedDonation[]): PackedDonation[] {
    return donations.map(donation => {
      return this.fixJsonDateIssuePacked(donation);
    });
  }

  /**
   * JSON is returning dates as strings. so converting
   * @param fund
   * @returns
   */
  fixJsonDateIssuePacked(donation: PackedDonation): PackedDonation {
    if (donation.received) {
      donation.received = new Date(donation.received);
    }
    return donation;
  }

  fixJsonDateIssueList(donations: Donation[]): Donation[] {
    return donations.map(donation => {
      return this.fixJsonDateIssue(donation);
    });
  }

  /**
   * JSON is returning dates as strings. so converting
   * @param fund
   * @returns
   */
  fixJsonDateIssue(donation: Donation): Donation {
    if (donation.received) {
      donation.received = new Date(donation.received);
    }
    return donation;
  }

  async validateDonation(donationId: string, valid: boolean): Promise<string> {
    if (donationId) {
      const res = await fetch(
        DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointValidateDonation,
        {
          method: 'POST',
          body: JSON.stringify({ donationId, valid })
        }
      );
      const posts = await res.json();
      if (res.status === 200 && posts.error.length === 0) {
        return '';
      }
      console.error('Error validating donation: ' + donationId + ' : ' + posts);
      return posts.error;
    }
    return 'Null donationId';
  }

  /**
   * Gets unique donations
   * Condenses on unique donatorId
   * adds amounts
   * @param fundraiserId
   * @returns
   */
  async getPackedDonationsCondensed(fundraiserId: string): Promise<PackedDonation[]> {
    let [donations, error] = await this.getPackedDonationsByFundraiser(fundraiserId);
    if (error && error.length > 0) {
      console.error('Had issue getting donations: ' + error);
      return [];
    }
    let condensedList: PackedDonation[] = [];
    donations.forEach(donation => {
      let index = condensedList.findIndex(
        item => item.donatorId === donation.donatorId
      );
      if (index === -1) {
        condensedList.push(donation);
      } else {
        condensedList[index].amount =
          condensedList[index].amount + donation.amount;
      }
    });
    return condensedList;
  }
}