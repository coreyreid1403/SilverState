import type { NextApiRequest, NextApiResponse } from "next";
import { FundraiserHelper } from "../helpers/FundraiserHelper";
import Fundraiser from "../../../../models/LumiFundraising/Fundraiser";

type responseObject = {
  fundraiser: Fundraiser| undefined;
  error: string;
};

let fundraiserHelper = new FundraiserHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const fundraiserId = body?.fundraiserId;

  if (fundraiserId) {
    const fund = await fundraiserHelper.getFundraiser(fundraiserId);
    if (fund) {
      res.status(200).json({ fundraiser: fund, error: "" });
    } else {
      res.status(200).json({ fundraiser: undefined, error: "Could not find fundraiser" });
    }
  } else {
    res.status(200).json({ fundraiser: undefined, error: "Bad request bud" });
  }
}
