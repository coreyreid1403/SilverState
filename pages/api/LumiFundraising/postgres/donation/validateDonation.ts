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
  const valid = body?.valid;
  if(donationId){
    console.log(donationId + valid);
    const success = await donationHelper.validateDonation(donationId, valid);
    if(success){
      res.status(200).json({ error: ''})
    }
    res.status(400).json({ error: 'Error validating donation in DB'})
  } else{
    res.status(400).json({error: 'Bad Request for validating donation'})
  }
}
