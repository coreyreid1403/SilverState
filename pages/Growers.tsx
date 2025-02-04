import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, OuterGlowTitle, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const Growers: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <OuterGlowTitle>Growers</OuterGlowTitle>
      
      <MediumSpacing/>
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default Growers;
