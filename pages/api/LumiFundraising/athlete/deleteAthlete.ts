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
  const athleteId = body?.athleteId;
  const fundraiserId = body?.fundraiserId;
  if(athleteId && fundraiserId){
    const gotAthlete = await athleteHelper.getAthlete(athleteId, fundraiserId);
    if(gotAthlete){
      await athleteHelper.deleteAthlete(athleteId, fundraiserId);
      res.status(200).json(({ error: ''}));
    } else{
      res.status(200).json({ error: 'Athlete does not exists in fundraiser'})
    }
  } else{
    res.status(200).json({ error: 'Bad Request'})
  }
}
