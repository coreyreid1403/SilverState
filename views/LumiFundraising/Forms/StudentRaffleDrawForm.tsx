import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Donation from '../../../models/LumiFundraising/Donation';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import DonationService from '../../../services/LumiFundraising/DonationService';
import FundraiserService from '../../../services/LumiFundraising/FundraiserService';
import { SmallSpace } from '../../../styles/SharedStyles';
import Athlete from '../../../models/LumiFundraising/Users/Athlete';
import AthleteService from '../../../services/LumiFundraising/AthleteService';

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
function StudentRaffleDrawForm({
  fundraiser,
  submit,
  setWindowOpenFlag,
  athletes,
  athleteService,
  athleteDonationMap
}: {
  fundraiser: Fundraiser;
  submit: Function;
  setWindowOpenFlag: Function;
  athletes: Athlete[];
  athleteService: AthleteService;
  athleteDonationMap: Map<string, Donation[]>;
}) {
  const fundraiserService = new FundraiserService();
  const fundProperties = fundraiserService.getStudentRaffleProperties(
    fundraiser.typeProperties
  );
  const [winners, setWinners] = useState<string[]>(['', '', '']);

  useEffect(() => {
    if(fundProperties?.winners){
      setWinners(fundProperties.winners);
    }
  }, []);

  function onSubmit(e: any) {
    submit(winners);
    setWindowOpenFlag(true);
  }

  async function drawTicket(place: number) {
    if (fundProperties) {
      let tickets: string[] = [];
      await Promise.all(athletes.map(async athlete => {
        const numTickets = await athleteService.calculateAthleteTickets(athlete.userId, fundProperties, athleteDonationMap);
        for (var i = 0; i < numTickets; i++) tickets.push(athlete.name);
      }));
      let winningId =  tickets[Math.floor(Math.random() * tickets.length)];
      let temp = winners.slice(0);
      temp[place] = winningId;
      setWinners(temp);
    }
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
            {winners[0]?.length > 0 && <>{winners[0]}</>}
          </label>
          {fundProperties && fundProperties.prizes[1] > 0 && (
            <label>
              <span>2nd: ${fundProperties.prizes[1]}</span>
              <SmallSpace />
              <Button variant="dark" onClick={() => drawTicket(1)}>
                Draw
              </Button>
              <SmallSpace />
              {winners[1]?.length > 0 && <>{winners[1]}</>}
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
              {winners[2]?.length > 0 && <>{winners[2]}</>}
            </label>
          )}
          <input type="submit" value="Submit" className={'button'} />
        </Center>
      </form>
    </>
  );
}

export default StudentRaffleDrawForm;
