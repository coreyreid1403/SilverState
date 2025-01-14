import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center, StyledTable } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { Button, CardFooter, CardHeader } from 'react-bootstrap';
import GlobalVariables from '../util/GlobalVariables';
import { useEffect, useState } from 'react';
import Cart from '../models/Cart';
import { MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import WinePurchaseInfo from '../models/WinePurchaseInfo';
import PaymentService from '../services/PaymentService';

const CartPage: NextPage = () => {
  let globals = GlobalVariables.getInstance();
  const [cart, setCart] = useState<Cart | undefined>();
  const [selectedWines, setSelectedWines] = useState<WinePurchaseInfo[]>([]);
  const paymentService = new PaymentService();
  
  useEffect(() => {
    let cart = globals?.getCart();
    setCart(cart);
    setSelectedWines(cart?.items ?? [])
  }, []);

  return (
    <StyledContainer center={true}>
      <Title>Cart</Title>

      <MediumSpacing />
      <Card>
        <CardHeader><Center><h5>Cart</h5></Center></CardHeader>
        <StyledTable>
          <MDBTableHead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Amount</th>
              <th scope="col">$</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {cart?.items.map((info: WinePurchaseInfo) => {
              let wineNumber = 0
              wineNumber = wineNumber + 1;
              return (
                <tr key={wineNumber}>
                  <td width='100px'>{info.year.year + ' ' + info.wine.name}</td>
                  <td width='75px'>{info.amount}</td>
                  <td width='75px'>${info.amount * info.year.cost}</td>
                  <td><Button variant="dark" onClick={() => { 
                    cart.items = cart.items.filter((item) => item !== info);
                    setSelectedWines(selectedWines.filter((item) => item !== info)) }}>X</Button></td>
                </tr>
              );
            })}
          </MDBTableBody>
        </StyledTable>
        <CardFooter><Center><h5>Total: ${paymentService.calculateTotal(cart?.items ?? [])}</h5></Center></CardFooter>
      </Card>
    </StyledContainer>
  );
};

export default CartPage;
