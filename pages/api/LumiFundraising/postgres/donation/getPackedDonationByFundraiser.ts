import type { NextApiRequest, NextApiResponse } from "next";
import { DonationHelper } from "../../helpers/DonationHelper";
import PackedDonation from "../../../../../models/LumiFundraising/PackedDonation";

type responseObject = {
  donations: PackedDonation[];
  error: string;
};

let donationHelper = new DonationHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body)
  const fundraiserId = body?.fundraiserId;
  if(fundraiserId){
    const donations = await donationHelper.getPackedDonationsByFundraiser(fundraiserId);
    res.status(200).json({ donations: donations, error: ''})
  } else{
    res.status(400).json({donations: [], error: 'Bad Request for getting packed donations by fundraiser'})
  }
}
