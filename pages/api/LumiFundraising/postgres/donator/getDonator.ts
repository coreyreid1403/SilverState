import type { NextApiRequest, NextApiResponse } from "next";
import { DonatorHelper } from "../../helpers/DonatorHelper";
import Donator from "../../../../../models/LumiFundraising/Users/Donator";

type responseObject = {
  donator: Donator | undefined;
  error: string;
};

let donatorHelper = new DonatorHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body)
  const donatorId = body?.donatorId;
  if (donatorId) {
    const donator = await donatorHelper.getDonator(donatorId);
    res.status(200).json({ donator: donator, error: ''})
  } else{
    res.status(400).json({donator: undefined, error: 'Bad Request for getting donator'})
  }
}
