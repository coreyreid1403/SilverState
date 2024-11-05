import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const ContactUs: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Events</Title>
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

export default ContactUs;
