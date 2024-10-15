import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Donation from '../../../models/LumiFundraising/Donation';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import DonationService from '../../../services/LumiFundraising/DonationService';
import FundraiserService from '../../../services/LumiFundraising/FundraiserService';
import { SmallSpace } from '../../../styles/SharedStyles';

const Center = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  label {
    display: flex;
    padding: 10px;
  }
`;

/**
 * The donation form
 * @param props
 * @returns
 */
// @ts-ignore
function RaffleDrawForm({
  fundraiser,
  submit,
  setWindowOpenFlag,
  donationsCondensed
}: {
  fundraiser: Fundraiser;
  submit: Function;
  setWindowOpenFlag: Function;
  donationsCondensed: Donation[];
}) {
  const fundraiserService = new FundraiserService();
  const donationService = new DonationService();
  const fundProperties = fundraiserService.getRaffleProperties(
    fundraiser.typeProperties
  );
  const [winners, setWinners] = useState<string[]>(['', '', '']);
  const [winnersNames, setWinnersNames] = useState<string[]>(['', '', '']);

  useEffect(() => {
    if(fundProperties?.winners){
      let names = fundProperties.winners.map(donations => {
        return donations.donator.name;
      });
      setWinnersNames(names);
      let ids = fundProperties.winners.map(donations => {
        return donations.donationId;
      });
      setWinners(ids);
    }
  }, [fundProperties]);

  function onSubmit(e: any) {
    submit(winners);
    setWindowOpenFlag(true);
  }

  async function drawTicket(place: number) {
    if (fundProperties) {
      let tickets: string[] = [];
      donationsCondensed.forEach(donation => {
        let numTickets = Math.floor(
          donation.amount / fundProperties.pricePerTicket
        );
        for (var i = 0; i < numTickets; i++) tickets.push(donation.donationId);
      });
      let winningId =  tickets[Math.floor(Math.random() * tickets.length)];
      let temp = winners.slice(0);
      temp[place] = winningId;
      setWinners(temp);

      let tempName = winnersNames.slice(0);
      tempName[place] = await getName(winningId);
      setWinnersNames(tempName);
    }
  }

  async function getName(donationId: string) {
    let [donation, error] = await donationService.getPackedDonation(donationId);
    return donation?.donator.name ?? '';
  }

  return (
    <>
      <form
        className={'form'}
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <p>
          <b>Fundraiser: </b>
          {fundraiser.name}
        </p>
        <Center>
          <label>
            <span>1st: ${fundProperties?.prizes[0] ?? 0}</span>
            <SmallSpace />
            <Button variant="dark" onClick={() => drawTicket(0)}>
              Draw
            </Button>
            <SmallSpace />
            {winnersNames[0]?.length > 0 && <>{winnersNames[0]}</>}
          </label>
          {fundProperties && fundProperties.prizes[1] > 0 && (
            <label>
              <span>2nd: ${fundProperties.prizes[1]}</span>
              <SmallSpace />
              <Button variant="dark" onClick={() => drawTicket(1)}>
                Draw
              </Button>
              <SmallSpace />
              {winnersNames[1]?.length > 0 && <>{winnersNames[1]}</>}
            </label>
          )}
          {fundProperties && fundProperties.prizes[2] > 0 && (
            <label>
              <span>3rd: ${fundProperties.prizes[2]}</span>
              <SmallSpace />
              <Button variant="dark" onClick={() => drawTicket(2)}>
                Draw
              </Button>
              <SmallSpace />
              {winnersNames[2]?.length > 0 && <>{winnersNames[2]}</>}
            </label>
          )}
          <input type="submit" value="Submit" className={'button'} />
        </Center>
      </form>
    </>
  );
}

export default RaffleDrawForm;
