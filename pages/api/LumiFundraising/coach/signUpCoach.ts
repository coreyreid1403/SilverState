import type { NextApiRequest, NextApiResponse } from "next";
import { Constants } from "../../../../util/LumiMeals/Constants";
import { CoachHelper } from "../helpers/CoachHelper";
import Coach from "../../../../models/LumiFundraising/Users/Coach";

type responseObject = {
  error: string;
};

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

let coachHelper = new CoachHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body)
  const name = body?.name;
  const email = body?.email;
  const password = body?.password; // cryptr.decrypt(body?.password);
  const coach = new Coach(name, email, password);
  if(coach){
    const gotCoach = await coachHelper.getCoach(coach.email);
    if(gotCoach){
      res.status(200).json({ error: 'Email already used'})
    } else{
      const success = await coachHelper.newCoach(coach);
      if(success){
        res.status(200).json(({ error: ''}));
      } else{
        res.status(200).json(({ error: 'Failed to add Coach'}));
      }
    }
  } else{
    res.status(200).json({ error: 'Bad Request'})
  }
}
