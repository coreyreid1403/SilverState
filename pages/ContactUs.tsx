import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import backgroundLarge from '../public/assets/images/photos/vineArch.jpg';
import Image from 'react-bootstrap/Image';

const ContactUs: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Contact us</Title>
      <MediumSpacing/>
      {/* <Image src={'../public/assets/images/photos/vineScean.jpg'} rounded />
      <img src='../public/assets/images/photos/vineScean.jpg'/> */}
      <Card>
        <Center>
            <CardContent>
                Mike and Christine Lenox: (775) 741-4707 <br />
                Email: <a href='mailto:SilverStateVandW@gmail.com'>SilverStateVandW@gmail.com</a>
            </CardContent>
        </Center>
      </Card>
    </StyledContainer>
  );
};

export default ContactUs;
