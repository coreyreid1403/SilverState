import type { NextApiRequest, NextApiResponse } from "next";
import { AthleteHelper } from "../helpers/AthleteHelper";
import Athlete from "../../../../models/LumiFundraising/Users/Athlete";

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
  const athleteId = body?.athleteId;
  const fundraiserId = body?.fundraiserId;

  if (athleteId && fundraiserId) {
    const user = await athleteHelper.getAthlete(athleteId, fundraiserId);
    if (user) {
      res.status(200).json({ athlete: user, error: "" });
    } else {
      res.status(200).json({ athlete: undefined, error: "Could not find athlete" });
    }
  } else {
    res.status(200).json({ athlete: undefined, error: "Bad request bud" });
  }
}
