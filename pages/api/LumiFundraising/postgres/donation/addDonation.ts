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
  const donation = body?.donation;
  if (donation) {
    try {
      await donationHelper.newDonation(donation);
      res.status(200).json({ error: '' })
    } catch (e) {
      res.status(400).json({ error: 'Error adding donation to DB: ' + e })
    }
  } else {
    res.status(400).json({ error: 'Bad Request for adding donation' })
  }
}
