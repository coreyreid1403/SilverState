import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/LumiMeals/User/User";
import { Constants } from "../../../util/LumiMeals/Constants";
import { UserHelper } from "../helpers/UserHelper";

type responseObject = {
  user: User | undefined;
  error: string;
};

let userHelper = new UserHelper();
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const body = JSON.parse(req.body);
  const email = body?.email;
  if (email) {
    const user = await userHelper.getUser(email);
    if (user) {
      //encrypt password
      // user.password = cryptr.encrypt(user.password);
      res.status(200).json({ user: user, error: "" });
    } else {
      res.status(200).json({ user: undefined, error: "Could not find user" });
    }
  } else {
    res.status(200).json({ user: undefined, error: "Bad request bud" });
  }
}
