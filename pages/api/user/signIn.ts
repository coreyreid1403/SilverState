import type { NextApiRequest, NextApiResponse } from 'next'
import { Constants } from '../../../util/LumiMeals/Constants';
import { UserHelper } from '../helpers/UserHelper';

type responseObject = {
  error: string;
}

let userHelper = new UserHelper();

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const email = body?.email;
  const password = body?.password; //cryptr.decrypt(body?.password);
  if(email && password){
    const user = await userHelper.getUser(email);
    if(user){
      if(user.password === password){
        res.status(200).json(({ error: ''}));
      } else{
        res.status(200).json(({ error: 'Password does not match'}));
      }
    } else{
      res.status(200).json({ error: 'Could not find user'})
    }
  } else{
    res.status(200).json({ error: 'Bad request bud'})
  }
}