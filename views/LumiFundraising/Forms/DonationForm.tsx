import globalFormStyle from '../../../styles/LumiFundraising/views/FormStyle';
import { useEffect, useState } from 'react';
import React from 'react';
import ToolTip from '../../ToolTip';
import styled from 'styled-components';
import { Spacing } from '../../../styles/SharedStyles';
import FeeService from '../../../services/LumiFundraising/FeeService';

const StyledTitle = styled.div`
  float: left;
  text-align: left !important;
  max-width: 150px;
`;

/**
 * The donation form
 * @param props
 * @returns
 */
// @ts-ignore
function DonationForm({
  fundraiserName,
  athleteName,
  emailRequired,
  coverExtraTicket,
  ticketPrice,
  primary,
  secondary,
  invertFontColor,
  feeService,
  submit
}: {
  fundraiserName: string;
  athleteName: string;
  emailRequired: boolean;
  coverExtraTicket: boolean;
  ticketPrice: number;
  primary: string;
  secondary: string;
  invertFontColor: boolean;
  feeService: FeeService;
  submit: Function;
}) {
  const globalFormStyleString = globalFormStyle();
  /**
   * States
   */
  //if they want to cover the overhead charges
  const [coverCharges, setCoverCharges] = useState(false);
  //fee if donator wants to cover it
  const [paymentOverhead, setPaymentOverhead] = useState(0.0);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  return (
    <form
      className={'form'}
      onSubmit={e => {
        e.preventDefault();
        submit(e);
      }}
    >
      <style jsx global>
        {globalFormStyleString}
      </style>
      <style jsx>{`
        .fieldset {
          background: ${primary};
          border: 1px solid ${secondary};
          box-shadow: inset 0px 0px 15px ${secondary};
          -moz-box-shadow: inset 0px 0px 15px ${secondary};
          -webkit-box-shadow: inset 0px 0px 15px ${secondary};
        }
        .label > span {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
        }
        .label > p {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
        }
        .label > title {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
        }
        .label > div {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
        }
        .fieldset legend {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          border-top: 1px solid ${secondary};
          border-left: 1px solid ${secondary};
          border-right: 1px solid ${secondary};
          background: ${primary};
          box-shadow: -0px -1px 2px ${secondary};
          -moz-box-shadow: -0px -1px 2px ${secondary};
          -webkit-box-shadow: -0px -1px 2px ${secondary};
        }
        .input {
          border: 1px solid ${secondary};
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          background: ${primary};
        }
        .input[type='text'],
        .input[type='date'],
        .input[type='datetime'],
        .input[type='number'],
        .input[type='search'],
        .input[type='time'],
        .input[type='url'],
        .input[type='email'],
        .input[type='checkbox'],
        .select,
        .textarea {
          box-shadow: inset 1px 1px 4px ${secondary};
          -moz-box-shadow: inset 1px 1px 4px ${secondary};
          -webkit-box-shadow: inset 1px 1px 4px ${secondary};
        }
        .input[type='submit'],
        .input[type='button'] {
          box-shadow: inset -1px -1px 3px ${secondary};
          -moz-box-shadow: inset -1px -1px 3px ${secondary};
          -webkit-box-shadow: inset -1px -1px 3px ${secondary};
        }
        .button {
          box-shadow: inset -1px -1px 3px ${primary};
          -moz-box-shadow: inset -1px -1px 3px ${primary};
          -webkit-box-shadow: inset -1px -1px 3px ${primary};
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          background: ${secondary};
        }
      `}</style>
      <fieldset className={'fieldset'}>
        <legend>Donation Form</legend>
        <label htmlFor="Program" className={'label'}>
          <title>Program:</title>
          <div>
            {fundraiserName} {/*//TODO */}
          </div>
        </label>
        <label htmlFor="Athlete" className={'label'}>
          <title>Athlete:</title>
          <div>{athleteName}</div>
        </label>
        <label htmlFor="Name" className={'label'}>
          <title>Name:</title>
          <input type="text" className={'input'} id="nameInput" required />
        </label>
        {emailRequired && (
          <label htmlFor="Email" className={'label'}>
            <StyledTitle>
              Email:{' '}
              <ToolTip
                invert={invertFontColor}
                message="Contact info if you win a raffle prize."
              />
            </StyledTitle>
            <input type="email" className={'input'} id="emailInput" required />
          </label>
        )}
        <label htmlFor="DonationAmount" className={'label'}>
          <StyledTitle>
            Donation Amount:{' '}
            <small hidden={!(emailRequired && ticketPrice > 0)}>
              (One ticket: ${ticketPrice})
            </small>
          </StyledTitle>
          <input
            type="number"
            className={'input'}
            onChange={amount =>
              setPaymentOverhead(feeService.calculateFeesCompounding(+amount.target.value))
            }
            id="amountInput"
            pattern="\d*"
            required
          />
        </label>
        <label htmlFor="CoverChargeCheckbox" className={'label'}>
          <StyledTitle>
            Do you want to cover the processing charges?*{' '}
            <small hidden={!coverExtraTicket}>
              (This will give you a bonus raffle ticket)
            </small>
          </StyledTitle>
          <div>
            <div>(${paymentOverhead})</div>
            <input
              type="checkbox"
              checked={coverCharges}
              onChange={() => setCoverCharges(!coverCharges)}
              className={'input'}
              id="coverChargesInput"
            />
          </div>
        </label>
        <Spacing />
        <input type="submit" value="Donate" className={'button'} />
      </fieldset>
    </form>
  );
}

export default DonationForm;
