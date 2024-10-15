import { ref, set, child, get, push, update } from "firebase/database";
import { User } from "../../../../models/LumiMeals/User/User";
import { databaseMeals } from "../database/firebase";

export class UserHelper {
  /**
   * Add a user
   * @returns if added successfully
   */
  async newUser(email: string, name: string, password: string): Promise<boolean> {
    return set(ref(databaseMeals, "users/" + email), {
      user: new User(name, password, email),
    })
      .then(() => {
        console.log("Added user: " + name);
        return true;
      })
      .catch((error) => {
        console.error("Error adding user: " + name + ", " + error);
        return false;
      });
  }

  async updateUser(user: User): Promise<string> {
    return set(ref(databaseMeals, "users/" + user.email), {
      user: user,
    })
      .then(async () => {
        console.log("Updated user: " + user.userName);
        //await this.getUser(user.email)//TODO: removed??? idk why this was here
        return '';
      })
      .catch((error) => {
        console.error("Error updating user: " + user.userName + ", " + error);
        return 'Error updating user in database';
      });
  }

  /**
   * Gets user by email
   */
  async getUser(email: string): Promise<User | undefined> {
    const dbRef = ref(databaseMeals);
    return get(child(dbRef, `users/${email}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val().user;
        } else {
          console.log("No data available getUser");
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  }

  //updates a specific property, we will just override the whole user
  // async updateUser(user: User): Promise<string> {
  //     let email = user.email.substring(0, user.email.length - 4).toLowerCase();
  //     // A post entry.
  //     const postData = {
  //         username: user.userName,
  //         email: email
  //     };

  //     // Get a key for a new Post.
  //     const newPostKey = push(child(ref(database), 'posts')).key;

  //     // Write the new post's data simultaneously in the posts list and the user's post list.
  //     let prop1 = '/posts/' + newPostKey;
  //     let prop2 = '/user-posts/' + email + '/' + newPostKey;
  //     const updates = {
  //     [prop1]: postData,
  //     [prop2]: postData
  //     };

  //     await update(ref(database), updates);
  //     return '';
  // }

  // listenStream(){
  //   const starCountRef = ref(this.db, 'posts/' + '1' + '/starCount');
  //   onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  //   });
  // }
}
