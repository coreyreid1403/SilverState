import type { NextPage } from 'next';
import { MediumSpacing, CardContent, Title, Card, Center, StyledTable } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { Button, CardHeader, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Wine } from '../models/Wine';
import { WineYear } from '../models/WineYear';
import Constants from '../util/Constants';

const Products: NextPage = () => {
  const [wine, setWine] = useState<Wine>(Constants.Wines[0]);
  const [count, setCount] = useState(0);

    function dropDownUpdate(change: any) {
      console.log(change.target.value);
      let foundWine: Wine | undefined = Constants.Wines.find(wine => wine.name = change.target.value)
      if(foundWine){
        console.log(foundWine)
        handleClick()
        setWine(foundWine);
      }
  }
  useEffect(() => {
    console.log(wine?.name + ' updated');
}, [wine]);

const handleClick = () => {
  setCount(prevCount => prevCount + 1);
};

  return (
    <StyledContainer center={true}>
      <Title>Products</Title>
      <MediumSpacing/>
      <Card>
        <Center>
          {/* <DropdownButton variant="secondary" title={wine?.name ?? 'Choose Wine'} onSelect={(change, event) => dropDownUpdate(change, event)}>
          {Constants.Wines.map((wineDropdown: Wine) => {
            if(wineDropdown?.years.find(year => year.count > 0)){
              return <Dropdown.Item key={wineDropdown.name}>{wineDropdown.name}</Dropdown.Item>;
            }
          })}
          </DropdownButton> */}
          
          <Form.Select aria-label="Default select example" onChange={(change) => dropDownUpdate(change)}>
          {Constants.Wines.map((wineDropdown: Wine) => {
            if(wineDropdown?.years.find(year => year.count > 0)){
              return <option value={wineDropdown.name}>{wineDropdown.name}</option>;
            }
          })}

        </Form.Select>
            <CardContent>
              <p>{wine?.name + count}</p>
            {/* <StyledTable>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
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
                  <th scope="row">{wineNumber}</th>
                  <td>{year.year}</td>
                  <td>{year.cost}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </StyledTable> */}
            </CardContent>
        </Center>
      </Card>
    </StyledContainer>
  );
};

export default Products;
