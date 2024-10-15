import type { NextApiRequest, NextApiResponse } from "next";
import { Constants } from "../../../../util/LumiMeals/Constants";
import { CoachHelper } from "../helpers/CoachHelper";

type responseObject = {
  error: string;
};

let coachHelper = new CoachHelper();
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const coach = JSON.parse(req.body)?.coach;
  if (coach) {
    // coach.password = cryptr.decrypt(coach.password);
    coachHelper.updateCoach(coach).then((error) => {
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
