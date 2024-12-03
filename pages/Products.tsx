import type { NextPage } from 'next';
import { MediumSpacing, CardContent, Title, Card, Center, StyledTable } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { Button, CardHeader, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Wine } from '../models/Wine';
import { WineYear } from '../models/WineYear';
import Constants from '../util/Constants';
import GlobalVariables from '../util/GlobalVariables';

const Products: NextPage = () => {
  let globals = GlobalVariables.getInstance();
  // const [wineName, setWineName] = useState<string>('Rosé');
  const [wine, setWine] = useState<Wine>(Constants.Wines[0]);
  const Wines2 = [1, 2, 3, 4, 5];

  function dropDownUpdate(change: any) {
    // setWineName(change.target.value);
    setWine(Constants.Wines.find(w => w.name === change.target.value) ?? Constants.Wines[0]);
  }

  return (
    <StyledContainer center={true}>
      <Title>Products</Title>
      <MediumSpacing />
      <Card>
        <Center>
          <Form.Select aria-label="Default select example" onChange={(change) => dropDownUpdate(change)}>
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
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {wine?.years.map((year: WineYear) => {
                  let wineNumber = 0
                  wineNumber = wineNumber + 1;
                  return (
                    <tr key={wineNumber}>
                      <td width='150px'>{year.year}</td>
                      <td width='150px'>${year.cost}</td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </StyledTable>
          </CardContent>
        </Center>
      </Card>
    </StyledContainer>
  );
};

export default Products;
