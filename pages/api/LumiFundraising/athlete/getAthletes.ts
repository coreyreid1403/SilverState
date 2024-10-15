import type { NextApiRequest, NextApiResponse } from "next";
import Athlete from "../../../../models/LumiFundraising/Users/Athlete";
import { AthleteHelper } from "../helpers/AthleteHelper";

type responseObject = {
  athletes: Athlete[];
  error: string;
};

let athleteHelper = new AthleteHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const fundraiserId = body?.fundraiserId;

  if (fundraiserId) {
    const athletes = await athleteHelper.getAthletes(fundraiserId);
    if (athletes) {      
      let athletesArray: Athlete[] = [];
      let i = 0;
      while(Object.values(athletes)[i]){
        athletesArray.push(Object.values(athletes)[i]);
        i++;
      }
      res.status(200).json({ athletes: athletesArray, error: "" });
    } else {
      res.status(200).json({ athletes: [], error: "Could not find Athletes under fundraiser" });
    }
  } else {
    res.status(200).json({ athletes: [], error: "Bad request bud" });
  }
}
