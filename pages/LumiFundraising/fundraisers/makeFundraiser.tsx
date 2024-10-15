import type { NextPage } from 'next'
// import globalFormStyle from "../../../styles/LumiFundraising/views/FormStyle";
import FundraiserForm from '../../../views/LumiFundraising/Forms/FundraiserForm';
import { useState } from 'react';
import DonationConstants from '../../../util/LumiFundraising/DonationConstants';
import StyledContainer from '../../../views/StyledContainer';
import VerifyPopUpWindowInternal from '../../../views/popups/VerifyPopUpWindowInternal';

const MakeFundraiser: NextPage = () => {
  // const globalFormStyleString = globalFormStyle();
  const [primaryColor, setPrimaryColor] = useState<string>(DonationConstants.defaultPrimary);
  const [secondaryColor, setSecondaryColor] = useState<string>(DonationConstants.defaultSecondary);
  function setPrimary(color: string){
    setPrimaryColor(color);
  }
  function setSecondary(color: string){
    setSecondaryColor(color);
  }
  return (
    <StyledContainer center={true}>
      <VerifyPopUpWindowInternal
      title="Raffle Winners"
      submitButtonName="Woot"
      buttonClick={() => []}>
        <></>
      </VerifyPopUpWindowInternal>
        <FundraiserForm primary={primaryColor} secondary={secondaryColor} setPrimary={setPrimary} setSecondary={setSecondary} />
    </StyledContainer>
  );
}

export default MakeFundraiser;