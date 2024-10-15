import type { NextApiRequest, NextApiResponse } from 'next';
import { FundraiserHelper } from '../helpers/FundraiserHelper';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';

type responseObject = {
  fundraisers: Fundraiser[];
};

let fundraiserHelper = new FundraiserHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const funds = await fundraiserHelper.getAllFundraisers();
  if (funds) {      
    let fundArray: Fundraiser[] = [];
    let i = 0;
    while(Object.values(funds)[i]){
      fundArray.push(Object.values(funds)[i]);
      i++;
    }
    res.status(200).json({ fundraisers: fundArray});
  } else {
    res.status(200).json({ fundraisers: []});
  }
}
