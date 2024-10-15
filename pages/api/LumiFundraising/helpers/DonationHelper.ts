import { sql } from "@vercel/postgres";
import Donation from "../../../../models/LumiFundraising/Donation";
import PackedDonation from "../../../../models/LumiFundraising/PackedDonation";
import Donator from "../../../../models/LumiFundraising/Users/Donator";
import Athlete from "../../../../models/LumiFundraising/Users/Athlete";

export class DonationHelper {

  async newDonation(donation: Donation): Promise<void> {
    await sql`INSERT INTO donations (donationid, donatorid, athleteid,
      amount, cash, bonusticket, received, completed, fundraiserid)
    VALUES (${donation.donationId}, ${donation.donatorId}, ${donation.athleteId}, 
      ${donation.amount}, ${donation.cash}, ${donation.bonusTicket}, ${donation.received.toString()}, 
      ${donation.completed}, ${donation.fundraiserId});`;
  }

  async getDonation(donationId: string): Promise<Donation | undefined> {
    const { rows } = await sql`SELECT * FROM donations
    WHERE donationId = ${donationId};`;
    return this.map(rows[0]);
  }

  async getPackedDonation(donationId: string): Promise<PackedDonation | undefined> {
    const { rows } = await sql`SELECT donations.*, donators .* FROM donations
    JOIN donators on donators.donatorid = donations.donatorid
    WHERE donationId = ${donationId};`;
    return this.mapPacked(rows[0]);
  }

  async getDonationsByIds(donationIds: string): Promise<Donation[]> {
    const { rows } = await sql`SELECT * FROM donations
    WHERE donationId IN (${donationIds}) AND completed = true;`;
    return this.mapList(rows);
  }

  async getPackedDonationsByIds(donationIds: string): Promise<PackedDonation[]> {
    const { rows } = await sql`SELECT donations.*, donators .* FROM donations
    JOIN donators on donators.donatorid = donations.donatorid
    WHERE donationId IN (${donationIds}) AND completed = true;`;
    return this.mapListPacked(rows);
  }

  async getDonationsByAthlete(athleteId: string): Promise<Donation[]> {
    const { rows } = await sql`SELECT * FROM donations
    WHERE athleteId = ${athleteId} AND completed = true;`;
    return this.mapList(rows);
  }

  async getFailedDonationsByAthlete(athleteId: string): Promise<Donation[]> {
    const { rows } = await sql`SELECT * FROM donations
    WHERE athleteId = ${athleteId} AND completed = false;`;
    return this.mapList(rows);
  }

  async getDonationsByFundraiser(fundraiserId: string): Promise<Donation[]> {
    const { rows } = await sql`SELECT * FROM donations
    WHERE fundraiserId = ${fundraiserId} AND completed = true;`;
    return this.mapList(rows);
  }

  async getPackedDonationsByFundraiser(fundraiserId: string): Promise<PackedDonation[]> {
    const { rows } = await sql`SELECT donations.*, donators .* FROM donations
    JOIN donators on donators.donatorid = donations.donatorid
    WHERE fundraiserId = ${fundraiserId} AND completed = true;`
    return this.mapListPacked(rows);
  }

  async getPackedDonationsByAthlete(athleteId: string): Promise<PackedDonation[]> {
    const { rows } = await sql`SELECT donations.*, donators .* FROM donations
    JOIN donators on donators.donatorid = donations.donatorid
    WHERE athleteId = ${athleteId} AND completed = true;`
    return this.mapListPacked(rows);
  }

  async getFailedPackedDonationsByAthlete(athleteId: string): Promise<PackedDonation[]> {
    const { rows } = await sql`SELECT donations.*, donators .* FROM donations
    JOIN donators on donators.donatorid = donations.donatorid
    WHERE athleteId = ${athleteId} AND completed = false;`
    return this.mapListPacked(rows);
  }

  async validateDonation(donationId: string, valid: boolean): Promise<boolean> {
    const { rows } = await sql`UPDATE donations
    SET completed = ${valid} 
    WHERE donationId = ${donationId};`;
    return rows.length === 0;
  }

  async removeDonation(donationId: string): Promise<boolean> {
    const { rows } = await sql`DELETE FROM donations
    WHERE donationId = ${donationId};`;
    return rows.length === 0;
  }

  map(res: any): Donation {
    let donation = new Donation(res.donatorid, res.amount, res.athleteid, res.athletename, res.fundraiserid, res.cash, res.bonusticket, res.completed);
    donation.donationId = res.donationid;
    donation.received = new Date(res.received);
    return donation;
  }

  mapList(reses: any): Donation[] {
    return reses.map((res: any) => {
      return this.map(res);
    });
  }

  mapPacked(res: any): PackedDonation {
    let donator = new Donator(res.name, res.email);
    donator.donatorId = res.donatorid;
    // let athlete = new Athlete();
    let donation = new PackedDonation(donator, res.amount, res.athleteid, res.athletename, res.fundraiserid, res.cash, res.bonusticket, res.completed);
    donation.donationId = res.donationid;
    donation.received = new Date(res.received);
    return donation;
  }

  mapListPacked(reses: any): PackedDonation[] {
    return reses.map((res: any) => {
      return this.mapPacked(res);
    });
  }
}
