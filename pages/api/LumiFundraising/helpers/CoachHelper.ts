import { ref, set, child, get} from "firebase/database";
import { databaseFund } from "../database/firebase";
import Coach from "../../../../models/LumiFundraising/Users/Coach";

export class CoachHelper {
  /**
   * Add a Coach
   * @returns if added successfully
   */
  async newCoach(coach: Coach): Promise<boolean> {
    return set(ref(databaseFund, "Coaches/" + coach.email), coach)
      .then(() => {
        console.log("Added Coach: " + coach.email);
        return true;
      })
      .catch((error) => {
        console.error("Error adding Coach: " + coach.email + ", " + error);
        return false;
      });
  }

  async updateCoach(coach: Coach): Promise<string> {
    return set(ref(databaseFund, "Coaches/" + coach.email), coach)
      .then(async () => {
        console.log("Updated Coach: " + coach.email);
        return '';
      })
      .catch((error) => {
        console.error("Error updating Coach: " + coach.email + ", " + error);
        return 'Error updating Coach in database';
      });
  }

  /**
   * Gets Coach by name
   */
  async getCoach(email: string): Promise<Coach | undefined> {
    const dbRef = ref(databaseFund);
    return get(child(dbRef, `Coaches/${email}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available getCoach");
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  }
}
