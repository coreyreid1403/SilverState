import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const History: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>History</Title>
      
      <MediumSpacing/>
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default History;
