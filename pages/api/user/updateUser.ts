import type { NextApiRequest, NextApiResponse } from "next";
import { Constants } from "../../../util/LumiMeals/Constants";
import { UserHelper } from "../helpers/UserHelper";

type responseObject = {
  error: string;
};

let userHelper = new UserHelper();
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_STRING);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  const user = JSON.parse(req.body)?.user;
  if (user) {
    // user.password = cryptr.decrypt(user.password);
    userHelper.updateUser(user).then((error) => {
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
