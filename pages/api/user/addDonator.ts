// import type { NextApiRequest, NextApiResponse } from "next";
// import { DonatorHelper } from "../../helpers/DonatorHelper";

// type responseObject = {
//   error: string;
// };

// let donatorHelper = new DonatorHelper();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<responseObject>
// ) {
//   const body = JSON.parse(req.body)
//   const donator = body?.donator;
//   if(donator){
//     try{
//      await donatorHelper.newDonator(donator);
//     res.status(200).json({ error: ''})
//   } catch(e){
//     res.status(400).json({ error: 'Error adding donator to DB: ' + e })
//   }
//   } else{
//     res.status(400).json({ error: 'Bad Request for adding donator'})
//   }
// }
