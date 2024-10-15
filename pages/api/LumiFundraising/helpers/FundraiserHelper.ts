import { ref, set, child, get, getDatabase } from 'firebase/database';
import { databaseFund } from '../database/firebase';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';

export class FundraiserHelper {
        // {
      //   name: fundraiser.name,
      //   team: fundraiser.team,
      //   teamId: fundraiser.teamId,
      //   coach: fundraiser.coach,
      //   primaryColor: fundraiser.primaryColor,
      //   secondaryColor: fundraiser.secondaryColor,
      //   invertFontColor: fundraiser.invertFontColor,
      //   startDate: fundraiser.startDate,
      //   type: fundraiser.type,
      //   athleteGoal: fundraiser.athleteGoal,
      //   overallGoal: fundraiser.overallGoal,
      //   payoutAddress: fundraiser.payoutAddress,
      //   payoutName: fundraiser.payoutName,
      //   requestMessage: fundraiser.requestMessage,
      //   noteFromCoach: fundraiser.noteFromCoach
      // }
  /**
   * Add a fundraiser
   * @returns if added successfully
   */
  async newFundraiser(fundraiser: Fundraiser): Promise<boolean> {
    return set(
      ref(databaseFund, 'Fundraisers/' + fundraiser?.id), fundraiser)
      .then(() => {
        console.log('Added fundraiser: ' + fundraiser?.id);
        return true;
      })
      .catch(error => {
        console.log(
          'Error adding fundraiser: ' + fundraiser?.id + ', ' + error
        );
        return false;
      });
  }

  async updateFundraiser(fundraiser: Fundraiser): Promise<string> {
    return set(
      ref(databaseFund, 'Fundraisers/' + fundraiser?.id), fundraiser)
      .then(async () => {
        console.log('Updated fundraiser: ' + fundraiser?.id);
        //await this.getFundraiser(fund?.id)
        return '';
      })
      .catch(error => {
        console.log(
          'Error updating fundraiser: ' + fundraiser?.id + ', ' + error
        );
        return 'Error updating fundraiser in database';
      });
  }

  /**
   * Gets Fundraiser by id
   */
  async getFundraiser(id: string): Promise<Fundraiser | undefined> {
    const dbRef = ref(databaseFund);
    return get(child(dbRef, `Fundraisers/${id}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available getFundraiser');
          return undefined;
        }
      })
      .catch(error => {
        console.error(error);
        return undefined;
      });
  }

  /**
   * Gets all Fundraisers
   */
  async getAllFundraisers(): Promise<Fundraiser[]> {
    const dbRef = ref(databaseFund);
    return get(child(dbRef, `Fundraisers`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available getFundraiser');
          return undefined;
        }
      })
      .catch(error => {
        console.error(error);
        return undefined;
      });
  }
}
