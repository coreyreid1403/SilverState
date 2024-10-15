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
  const body = JSON.parse(req.body)
  const name = body?.name;
  const email = body?.email;
  const password = body?.password; //cryptr.decrypt(body?.password);
  if(name && email && password){
    const gotUser = await userHelper.getUser(email);
    if(gotUser){
      res.status(200).json({ error: 'Email already used'})
    } else{
      const success = await userHelper.newUser(email, name, password);
      if(success){
        res.status(200).json(({ error: ''}));
      } else{
        res.status(200).json(({ error: 'Failed to add User'}));
      }
    }
  } else{
    res.status(200).json({ error: 'Bad Request'})
  }
}
