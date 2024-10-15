import { useEffect, useState } from 'react';
import StudentRaffleProperties from '../../../models/LumiFundraising/TypeProperties/StudentRaffleProperties';
import AthleteService from '../../../services/LumiFundraising/AthleteService';
import Donation from '../../../models/LumiFundraising/Donation';

function StudentRaffleRow({
  athleteName,
  donations,
  index,
  athleteService,
  fundProperties,
  fundraiserId
}: {
  athleteName: string;
  donations: Donation[];
  index: number;
  athleteService: AthleteService;
  fundProperties: StudentRaffleProperties | undefined;
  fundraiserId: string;
}) {
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    calculateTickets();
  }, []);

  async function calculateTickets(){
    const tickets = await athleteService.calculateTickets(donations, fundProperties, fundraiserId)
    setTickets(tickets);
  }

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{athleteName}</td>
      <td>{tickets}</td>
    </tr>
  );
}

export default StudentRaffleRow;
