import type { NextPage } from 'next'
import StyledContainer from '../../views/StyledContainer';
import { Title } from '../../styles/SharedStyles';

const RecipeHome: NextPage = () => {
  return (
    <StyledContainer center={true}>
        <Title>Welcome to Recipe Scheduler!</Title>

    </StyledContainer>
  );
}

export default RecipeHome
