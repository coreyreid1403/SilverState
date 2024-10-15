import { NextPage } from 'next';
import StyledContainer from '../../../views/StyledContainer';
import { Title } from '../../../styles/SharedStyles';

const Cancel: NextPage = () => {
  return (
    <StyledContainer center={true}>
        <Title>
         Donation Canceled
        </Title>
    </StyledContainer>
  )
}

export default Cancel;
