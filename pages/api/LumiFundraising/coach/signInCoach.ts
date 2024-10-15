import type { NextApiRequest, NextApiResponse } from 'next'
import { Constants } from '../../../../util/LumiMeals/Constants';
import { CoachHelper } from '../helpers/CoachHelper';
import Coach from '../../../../models/LumiFundraising/Users/Coach';

type responseObject = {
  coach: Coach | undefined;
  error: string;
}

let coachHelper = new CoachHelper();

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
    const coach = await coachHelper.getCoach(email);
    if(coach){
      if(coach.password === password){
        res.status(200).json(({ coach: coach, error: ''}));
      } else{
        res.status(200).json(({ coach: undefined, error: 'Password does not match'}));
      }
    } else{
      res.status(200).json({ coach: undefined, error: 'Could not find user'})
    }
  } else{
    res.status(200).json({ coach: undefined, error: 'Bad request bud'})
  }
}