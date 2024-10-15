import type { NextApiRequest, NextApiResponse } from "next";
import Athlete from "../../../../models/LumiFundraising/Users/Athlete";
import { AthleteHelper } from "../helpers/AthleteHelper";

type responseObject = {
  athlete: Athlete | undefined;
  error: string;
};

let athleteHelper = new AthleteHelper();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const fundraiserId = body?.fundraiserId;
  const athleteId = body?.athleteId;

  if (athleteId && fundraiserId) {
    const athlete = await athleteHelper.getAthlete(athleteId, fundraiserId);
    if (athlete) {
      res.status(200).json({ athlete: athlete, error: "" });
    } else {
      res.status(200).json({ athlete: undefined, error: "Could not find athlete" });
    }
  } else {
    res.status(200).json({ athlete: undefined, error: "Bad request bud" });
  }
}
