import type { NextApiRequest, NextApiResponse } from "next";
import { DonationHelper } from "../../helpers/DonationHelper";

type responseObject = {
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
    const success = await donationHelper.removeDonation(donationId);
    if(success){
      res.status(200).json({ error: ''})
    }
    res.status(400).json({ error: 'Error removing donation in DB'})
  } else{
    res.status(400).json({error: 'Bad Request for removing donation'})
  }
}
