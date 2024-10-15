import DonationConstants from '../../util/LumiFundraising/DonationConstants';

export default class FeeService {
  /**
   * Adds on amount added from submitting the fee. 
   * @param amount 
   * @returns 
   */
  calculateFeesCompounding(amount: number): number {
    let totalFee = this.calculateFeesSimple(amount);
    //set overhead charge to cover to the fee plus the stripe fee of the extra
    return +(totalFee + totalFee * DonationConstants.stripePercentage).toFixed(2);
  }

  calculateFeesSimple(amount: number): number {
    let stripeFee = amount * DonationConstants.stripePercentage + DonationConstants.stripeFlatFee;
    let myFee = amount * DonationConstants.myCharge;
    //total fee being charged to the team
    return stripeFee + myFee;
  }
}
