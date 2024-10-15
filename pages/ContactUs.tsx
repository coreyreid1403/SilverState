import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';

const ContactUs: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Contact us</Title>
      <MediumSpacing/>
      <Card>
        <CardContent>
          To contact us, please email us at<br/>
          Email: <a href='mailto:LuminescenceSoftware@gmail.com'>LuminescenceSoftware@gmail.com</a>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default ContactUs;
