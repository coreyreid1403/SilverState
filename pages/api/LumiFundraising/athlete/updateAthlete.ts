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
  const body = JSON.parse(req.body);
  const athlete = body?.athlete;

  if (athlete) {
    athleteHelper.updateAthlete(athlete).then((error) => {
      if (error === "") {
        res.status(200).json({ error: "" });
      } else {
        res.status(200).json({ error: error });
      }
    });
  } else {
    res.status(200).json({ error: "Bad request bud" });
  }
}
