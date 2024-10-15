import { nanoid } from 'nanoid'

export default class Donator{
  //#region properties
  donatorId: string;
  name: string;
  email: string;
  //#endregion

  /**
   *  Donation 
   */
  constructor(
    name: string,
    email: string
  ) {
    this.donatorId = nanoid();
    this.name = name;
    if(email.length === 0){
      this.email = 'NotProvided@email';
    }
    else{
      this.email = email;
    }
  }
}
