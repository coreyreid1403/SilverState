import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const Location: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Location</Title>
      
      <MediumSpacing/>
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default Location;
