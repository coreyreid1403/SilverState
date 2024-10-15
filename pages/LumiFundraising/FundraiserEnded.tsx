import type { NextPage } from 'next'
import StyledContainer from '../../views/StyledContainer';

const FundraiserEnded: NextPage = () => {
  return (
    <StyledContainer center={true}>
        <h2>We are sorry, but the fundraiser you are attempting to access does not exist, or has already ended. </h2>
        <h2 hidden={true}>We are sorry, but the fundraiser you are attempting to access has ended. </h2>
        <h2 hidden={true}>We are sorry, but the fundraiser you are attempting to access does not exist. </h2>
    </StyledContainer>
  );
}

export default FundraiserEnded;