import type { NextApiRequest, NextApiResponse } from "next";
import { Constants } from "../../../../util/LumiMeals/Constants";
import { CoachHelper } from "../helpers/CoachHelper";
import Coach from "../../../../models/LumiFundraising/Users/Coach";

type responseObject = {
  user: Coach | undefined;
  error: string;
};

let coachHelper = new CoachHelper();
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const coachEmail = body?.coachEmail;

  if (coachEmail) {
    const coach = await coachHelper.getCoach(coachEmail);
    if (coach) {
      //encrypt password
      // coach.password = cryptr.encrypt(coach.password);
      res.status(200).json({ user: coach, error: "" });
    } else {
      res.status(200).json({ user: undefined, error: "Could not find coach" });
    }
  } else {
    res.status(200).json({ user: undefined, error: "Bad request bud" });
  }
}
