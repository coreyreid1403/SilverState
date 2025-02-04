import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, OuterGlowTitle, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const Events: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <OuterGlowTitle>Events</OuterGlowTitle>
      
      <MediumSpacing/>
      <Card>
        <Center>
          <CardHeader>
            2025
          </CardHeader>
            <CardContent>
                June
                <hr/>
                No Events
            </CardContent>
        </Center>
      </Card>
    </StyledContainer>
  );
};

export default Events;
