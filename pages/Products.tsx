import type { NextPage } from 'next';
import { MediumSpacing, CardContent, Title, Card, Center, StyledTable, HalfCard, FormButton } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { Button, CardFooter, CardHeader, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Wine } from '../models/Wine';
import { WineYear } from '../models/WineYear';
import Constants from '../util/Constants';
import GlobalVariables from '../util/GlobalVariables';
import WinePurchaseInfo from '../models/WinePurchaseInfo';
import Cart from '../models/Cart';
import PaymentService from '../services/PaymentService';

const Products: NextPage = () => {
  let globals = GlobalVariables.getInstance();
  const paymentService = new PaymentService();
  const [wine, setWine] = useState<Wine>(Constants.Wines[0]);
  const [selectedWines, setSelectedWines] = useState<WinePurchaseInfo[]>([]);

  useEffect(() => {
    console.log(globals?.getCart().items.length)
    setSelectedWines(globals?.getCart().items ?? []);
  }, []);

  function dropDownUpdate(change: any) {
    setWine(Constants.Wines.find(w => w.name === change.target.value) ?? Constants.Wines[0]);
  }

  async function onSubmit(fields: any) {
    let numberOfBottles: number = Number(fields.target.numberOfBottles.value);
    let purchasedWine: Wine = wine;
    let yearString: string = fields.target.numberOfBottles.parentElement.parentElement.id;
    let year: WineYear = purchasedWine.years.find(x => x.year === Number(yearString)) ?? purchasedWine.years[0];

    let cart = new Cart('user', 'email', [...selectedWines, new WinePurchaseInfo(purchasedWine, year, numberOfBottles)], 'purchaseId');
    setSelectedWines(cart.items);
    let cookieResult = await globals?.setCart(cart)
    console.log("cookie result" + cookieResult)
    console.log(globals?.getCart().items.length)
  }

  return (
    <StyledContainer center={true}>
      <Title>Products</Title>
      <MediumSpacing />
      <Card>
        <form
          className={'form'}
          onSubmit={e => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <Center>
            <Form.Select aria-label="Default select example" onChange={(change) => dropDownUpdate(change)} style={{ marginTop: '5px', marginLeft: '5%', width: '90%', textAlign: 'center' }}>
              {Constants.Wines.map((wineDropdown: Wine) => {
                if (wineDropdown?.years.find(year => year.count > 0)) {
                  return <option value={wineDropdown.name}>{wineDropdown.name}</option>;
                }
              })}
            </Form.Select>
            <CardContent>
              <p>{wine.name}</p>
              <StyledTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">$</th>
                    <th scope="col">Purchase</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {wine?.years.map((year: WineYear) => {
                    let wineNumber = 0
                    wineNumber = wineNumber + 1;
                    return (
                      <tr key={year.year} id={year.year.toString()}>
                        <td width='100px'>{year.year}</td>
                        <td width='75px'>${year.cost}</td>
                        <td>
                          <input type="numeric" id="numberOfBottles" width={'10px'} />
                        </td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </StyledTable>
              <FormButton type="submit">Add</FormButton>
            </CardContent>
          </Center>
        </form>
      </Card>
      <HalfCard>
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
            {selectedWines.map((info: WinePurchaseInfo) => {
              let wineNumber = 0
              wineNumber = wineNumber + 1;
              return (
                <tr key={wineNumber}>
                  <td width='100px'>{info.year.year + ' ' + info.wine.name}</td>
                  <td width='75px'>{info.amount}</td>
                  <td width='75px'>${info.amount * info.year.cost}</td>
                  <td><Button variant="dark" onClick={() => { setSelectedWines(selectedWines.filter((item) => item !== info)) }}>X</Button></td>
                </tr>
              );
            })}
          </MDBTableBody>
        </StyledTable>
        <CardFooter><Center><h5>Total: ${paymentService.calculateTotal(selectedWines)}</h5></Center></CardFooter>
      </HalfCard>
    </StyledContainer>
  );
};

export default Products;
