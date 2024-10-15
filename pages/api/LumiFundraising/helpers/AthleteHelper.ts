import { ref, set, child, get, remove } from 'firebase/database';
import { databaseFund } from '../database/firebase';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';

export class AthleteHelper {
  /**
   * Add a Athlete
   * @returns if added successfully
   */
  async newAthlete(athlete: Athlete, fundraiserId: string): Promise<boolean> {
    return set(
      ref(
        databaseFund,
        'Athletes/' + fundraiserId + '/' + athlete.userId
      ), athlete)
      .then(() => {
        console.log('Added Athlete: ' + athlete.name);
        return true;
      })
      .catch(error => {
        console.error('Error adding Athlete: ' + athlete.name + ', ' + error);
        return false;
      });
  }

  async updateAthlete(athlete: Athlete): Promise<string> {
    return set(
      ref(
        databaseFund,
        'Athletes/' + athlete.fundraiserId + '/' + athlete.userId
      ), athlete)
      .then(async () => {
        console.log('Updated Athlete: ' + athlete.name);
        //await this.getAthlete(athlete.name)
        return '';
      })
      .catch(error => {
        console.error('Error updating Athlete: ' + athlete.name + ', ' + error);
        return 'Error updating Athlete in database';
      });
  }

  /**
   * Gets Athletes by fundraiserId and athleteId
   */
  async getAthlete(
    athleteId: string,
    fundraiserId: string
  ): Promise<Athlete | undefined> {
    const dbRef = ref(databaseFund);
    return get(child(dbRef, `Athletes/${fundraiserId}/${athleteId}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available getAthlete');
          return undefined;
        }
      })
      .catch(error => {
        console.error(error);
        return undefined;
      });
  }

  /**
   * Gets Athletes by fundraiserId
   */
  async getAthletes(fundraiserId: string): Promise<Athlete[]> {
    const dbRef = ref(databaseFund);
    return get(child(dbRef, `Athletes/${fundraiserId}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log('No data available getAthletes');
          return [];
        }
      })
      .catch(error => {
        console.error(error);
        return undefined;
      });
  }

  /**
   * Deletes Athletes by fundraiserId and athleteId
   */
  async deleteAthlete(
    athleteId: string,
    fundraiserId: string
  ): Promise<void> {
    const dbRef = ref(databaseFund);
    return remove(child(dbRef, `Athletes/${fundraiserId}/${athleteId}`))
      .then()
      .catch(error => {
        console.error(error);
      });
  }
}
