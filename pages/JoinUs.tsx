import type { NextPage } from 'next';
import { MediumSpacing, CardContent, Title, Card } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';

const JoinUs: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Join us</Title>
      <MediumSpacing/>
      <Card>
        <CardContent>
          We are in our non-profit stage, but still want to give
          back to our community. If experience is all your looking for, 
          we would be happy to teach you and have you work on our 
          applications to better your viability for employment. We know 
          its a tough hiring environment out there, and we want to help 
          you grow your skill and resume to help with the cause.
          <MediumSpacing/>
          For more information, please email us at<br/>
          Email: <a href='mailto:LuminescenceSoftware@gmail.com'>LuminescenceSoftware@gmail.com</a>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default JoinUs;
