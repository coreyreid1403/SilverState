import { FundraiserTypes } from "../enums";

/**
 * Base fundraiser Type
 */
export class BaseFundraiserType{
  //#region properties
  type: FundraiserTypes;
  //#endregion

  constructor(
    type: FundraiserTypes
  ) {
    this.type = type;
  }
}
