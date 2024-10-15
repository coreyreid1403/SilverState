import type { NextApiRequest, NextApiResponse } from "next";
import { FundraiserHelper } from "../helpers/FundraiserHelper";

type responseObject = {
  error: string;
};

let fundraiserHelper = new FundraiserHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const fundraiser = JSON.parse(req.body)?.fundraiser;
  if (fundraiser) {
    fundraiserHelper.updateFundraiser(fundraiser).then((error) => {
      if (error === "") {
        res.status(200).json({ error: "" });
      } else {
        res.status(200).json({ error: error });
      }
    });
  } else {
    res.status(200).json({ error: "Bad request bud" });
  }
}
