// import { sql } from "@vercel/postgres";
// import Donator from "../../../models/LumiFundraising/Users/Donator";

// export class DonatorHelper {

//   async newDonator(donator: Donator): Promise<void> {
//     await sql`INSERT INTO donators (donatorId, name, email)
//     VALUES (${donator.donatorId}, ${donator.name}, ${donator.email});`;
//   }

//   async getDonator(donatorId: string): Promise<Donator | undefined> {
//     const { rows } = await sql`SELECT * FROM donators
//       WHERE donatorId = ${donatorId};`;
//     return this.map(rows[0]);
//   }

//   map(res: any): Donator {
//     let donator = new Donator(res.name, res.email);
//     donator.donatorId = res.donatorid;
//     return donator;
//   }
// }
