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
  const body = JSON.parse(req.body)
  const fundraiser = body?.fundraiser;
  if(fundraiser){
    const gotFundraiser = await fundraiserHelper.getFundraiser(fundraiser?.id);
    if(gotFundraiser){
      res.status(200).json({ error: 'Fundraiser already Exists'})
    } else{
      const success = await fundraiserHelper.newFundraiser(fundraiser);
      if(success){
        res.status(200).json(({ error: ''}));
      } else{
        res.status(200).json(({ error: 'Failed to add Fundraiser'}));
      }
    }
  } else{
    res.status(200).json({ error: 'Bad Request'})
  }
}
