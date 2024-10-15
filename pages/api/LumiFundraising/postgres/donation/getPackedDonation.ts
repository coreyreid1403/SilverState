import type { NextApiRequest, NextApiResponse } from "next";
import { DonationHelper } from "../../helpers/DonationHelper";
import PackedDonation from "../../../../../models/LumiFundraising/PackedDonation";

type responseObject = {
  donation: PackedDonation | undefined;
  error: string;
};

let donationHelper = new DonationHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body)
  const donationId = body?.donationId;
  if(donationId){
    const donation = await donationHelper.getPackedDonation(donationId);
    res.status(200).json({ donation: donation, error: ''})
  } else{
    res.status(400).json({donation: undefined, error: 'Bad Request for getting packed donation'})
  }
}
