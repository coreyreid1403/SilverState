import React from 'react';
import ToolTip from '../../ToolTip';

/**
 * The donation form
 * @param props
 * @returns
 */
// @ts-ignore
function AddDonationForm({
  fundraiserName,
  athleteName,
  submit,
  setWindowOpenFlag,
  emailRequired
}: {
  fundraiserName: string;
  athleteName: string;
  submit: Function;
  setWindowOpenFlag: Function;
  emailRequired: boolean;
}) {

  function onSubmit(e: any) {
    submit(e);
    setWindowOpenFlag(true);
  }

  return (
    <form
      className={'form'}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <p>
        <b>Fundraiser: </b>
        {fundraiserName}
      </p>

      <p>
        <b>Athlete: </b>
        {athleteName}
      </p>

      <p>
        Donator: 
        <input type="text" className={'input'} id="nameInput" required />
      </p>

      <p>
        Donation Amount: 
        <input type="number" className={'input'} id="amountInput" pattern="\d*" required />
      </p>

      {emailRequired && (
          <p>
            Email: <ToolTip message="Contact info if you win a raffle prize." />
            <input type="email" className={'input'} id="emailInput" required />
            </p>
        )}

      <input type="submit" value="Donate" className={'button'} />
    </form>
  );
}

export default AddDonationForm;
