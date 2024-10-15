import styled from 'styled-components';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import { Required, SmallSpace } from '../../../styles/SharedStyles';
import ToolTip from '../../ToolTip';

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
function RafflePropertiesForm({
  fundraiser,
  submit,
  setWindowOpenFlag
}: {
  fundraiser: Fundraiser;
  submit: Function;
  setWindowOpenFlag: Function;
}) {
  function onSubmit(e: any) {
    submit(e);
    setWindowOpenFlag(true);
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
            <span>Price Per Ticket: </span>
            <Required>*</Required>
            <SmallSpace />
            <input type="number" id="priceInput" pattern="\d*" required />
          </label>
          <label>
            <span>Extra Ticket for covering web fee: </span>
            <ToolTip message="Give the donator an extra ticket of they choose to cover the web fees." />
            <SmallSpace />
            <input type="checkbox" id="extraTicketInput" />
          </label>
          <label>
            <span>1st: $</span>
            <Required>*</Required>
            <SmallSpace />
            <input type="number" id="firstInput" pattern="\d*" required />
          </label>
          <label>
            <span>2nd: $</span>
            <ToolTip message="Ignore if unwanted" />
            <SmallSpace />
            <input type="number" id="secondInput" pattern="\d*" />
          </label>
          <label>
            <span>3rd: $</span>
            <ToolTip message="Ignore if unwanted" />
            <SmallSpace />
            <input type="number" id="thirdInput" pattern="\d*" />
          </label>
          <input type="submit" value="Submit" className={'button'} />
        </Center>
      </form>
    </>
  );
}

export default RafflePropertiesForm;
