import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const Cart: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Cart</Title>
      
      <MediumSpacing/>
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default Cart;
