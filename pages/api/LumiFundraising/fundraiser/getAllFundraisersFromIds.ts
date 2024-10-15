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
  const body = JSON.parse(req.body);
  const fundIds: string[] = body?.fundIds;
  let list: Fundraiser[] = [];
  if (fundIds) {
    let i = 0;
    while (fundIds[i]) {
      const fund = await fundraiserHelper.getFundraiser(fundIds[i]);
      if (fund) {
        list.push(fund);
      }
      i++;
    }
  }
  res.status(200).json({ fundraisers: list });
}
