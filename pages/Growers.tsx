import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const Growers: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Growers</Title>
      
      <MediumSpacing/>
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default Growers;
