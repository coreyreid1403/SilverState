import type { NextApiRequest, NextApiResponse } from "next";
import { AthleteHelper } from "../helpers/AthleteHelper";

type responseObject = {
  error: string;
};

let athleteHelper = new AthleteHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body)
  const athlete = body?.athlete;
  const fundraiserId = body?.fundraiserId;
  if(athlete && fundraiserId){
    const gotAthlete = await athleteHelper.getAthlete(athlete.userId, fundraiserId);
    if(gotAthlete){
      res.status(200).json({ error: 'Athlete already exists'})
    } else{
      const success = await athleteHelper.newAthlete(athlete, fundraiserId);
      if(success){
        res.status(200).json(({ error: ''}));
      } else{
        res.status(200).json(({ error: 'Failed to add Athlete'}));
      }
    }
  } else{
    res.status(200).json({ error: 'Bad Request'})
  }
}
