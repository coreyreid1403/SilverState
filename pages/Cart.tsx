import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';
import GlobalVariables from '../util/GlobalVariables';
import { useEffect, useState } from 'react';
import Cart from '../models/Cart';

const CartPage: NextPage = () => {
  let globals = GlobalVariables.getInstance();
  const [cart, setCart] = useState<Cart | undefined>();
  useEffect(() => {
    setCart(globals?.getCart());
  }, []);

  return (
    <StyledContainer center={true}>
      <Title>Cart</Title>

      <MediumSpacing />
      <Card>
      </Card>
    </StyledContainer>
  );
};

export default CartPage;
