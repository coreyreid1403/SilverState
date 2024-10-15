/**
 *  Promotion information for recipe packs
*/
 export class Promo{
    //#region properties
    /**
     * the code to input to get promotion
     */
    promoCode: string;

    /**
     * number of people who can use the promo code
     */
    promoCodeLimit: number;

    /**
     * the start date of the promo code
     */
    promoStartDate: Date;

    /**
     * the end date of the promo code
     */
    promoEndDate: Date;

    /**
    * the % off (whole number)
    */
    promoCodeAmount: number;
//#endregion

    /**
     * A pack Promotion
     * @param promoCode 
     * @param promoCodeLimit 
     * @param promoStartDate 
     * @param promoEndDate 
     * @param promoCodeAmount 
     */
    constructor(promoCode: string, promoCodeLimit: number, promoStartDate: Date, promoEndDate: Date, promoCodeAmount: number){
        this.promoCode = promoCode;
        this.promoCodeLimit = promoCodeLimit;
        this.promoStartDate = promoStartDate;
        this.promoEndDate = promoEndDate;
        this.promoCodeAmount = promoCodeAmount;
    }
}