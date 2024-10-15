import Donator from "../../models/LumiFundraising/Users/Donator";
import DonationConstants from "../../util/LumiFundraising/DonationConstants";
import BaseService from "../BaseService";
import EmailService from "./EmailService";

export default class DonatorService extends BaseService {
  emailService = new EmailService();

  public async newDonator(
    donatorName: string,
    donatorEmail: string
  ): Promise<string> {
    let donator = new Donator(donatorName, donatorEmail);
    try {
      const wrappedF = this.wrap(async () => {
        return await fetch(
          DonationConstants.baseURL +
            DonationConstants.postgresURI +
            DonationConstants.endpointCreateDonator,
          {
            method: 'POST',
            body: JSON.stringify({ donator })
          }
        );
      });
      const res: Response = await wrappedF();

      const posts = await res.json();
      if (res.status !== 200 || posts.error.length !== 0) {
        console.error('Error with making donator: ' + posts.error);
        this.emailService.notifyOfError(
          'Creating donator',
          posts.error,
          donator
        );
      }
      return donator.donatorId;
    } catch (e: any) {
      console.error('Caught Error in creating Donator: ' + e);
      this.emailService.notifyOfError(
        'Creating donator error caught',
        e.toString(),
        donator
      );
      return '';
    }
  }


  public async getDonator(
    donatorId: string
  ): Promise<Donator> {
    const res = await fetch(
      DonationConstants.baseURL + DonationConstants.postgresURI + DonationConstants.endpointGetDonator,
      {
        method: 'POST',
        body: JSON.stringify({ donatorId })
      }
    );
    const posts = await res.json();
    if (res.status !== 200 || posts.error.length !== 0) {
      console.error('Error with getting donator: ' + posts.error);
      this.emailService.notifyOfError('Get donator', posts.error, donatorId);
    }
    return posts.donator
  }

  public async getDonatorName(
    donatorId: string
  ): Promise<string> {
    return (await this.getDonator(donatorId)).name;
  }

  public async getDonators(
    donatorIds: string[]
  ): Promise<Donator[]> {
    return await Promise.all(donatorIds.map(async donatorId => {
      return await this.getDonator(donatorId);
    }))
  }
}
