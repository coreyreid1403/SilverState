import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import VerifyPopUpWindow from '../../popups/VerifyPopUpWindow';

// @ts-ignore
function FundraiserRow({ fund, router, fundraiserService, pageRefresh, emailService }) {
  const [amountCollected, setAmountCollected] = useState(0);
  useEffect(() => {
    fundraiserService
      .getTotalAmountCollected(fund?.id)
      .then(setAmountCollected);
  }, [fund]);

  async function cancelFundraiser(fund: Fundraiser) {
    fund.endDate = new Date();
    let error = await fundraiserService.updateFundraiser(fund);
    pageRefresh();
    if (error) {
      console.error('Error canceling fundraiser: ' + error);
    }
    else{
      emailService.notifyOfError('Ended Fundraiser', "Ended Fundraiser", "https://www.luminescencesoftware.com//LumiFundraising/fundraisers/" + fund.id + "/EndFundraiser");
      router.push(`/LumiFundraising/fundraisers/${fund.id}/EndFundraiser`);
    }
  }

  function navigateToFund(id: string): void {
    router.push(`/LumiFundraising/fundraisers/${id}`);
  }

  function dateToString(date: Date | undefined): string {
    if (date) {
      return new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    return '';
  }

  return (
    <tr key={1}>
      <td>
        <Button onClick={() => navigateToFund(fund?.id)}>{fund.name}</Button>
      </td>
      <td>
        <div>{dateToString(fund.startDate)}</div>
      </td>
      <td>
        ${amountCollected} / ${fund.overallGoal}
      </td>
      <td>{fund.team}</td>
      <td>{fundraiserService.IsPaidOut(fund)}</td>
      <td>{dateToString(fund.endDate)}</td>
      <td>
        <VerifyPopUpWindow
          title="End Fundraiser"
          buttonName="End"
          submitButtonName="End"
          buttonClick={() => cancelFundraiser(fund)}
          hidden={fund.endDate !== undefined}
        >
          {' '}
          You sure you want to end <b>{fund.name}</b>? It will not be able to
          receive any more donations.{' '}
        </VerifyPopUpWindow>
      </td>
    </tr>
  );
}

export default FundraiserRow;
