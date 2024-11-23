import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';
import styled from 'styled-components';

const Location: NextPage = () => {
  const Iframe = styled.iframe`
    border:2px solid black
`;

  const Map = styled.div`
    width:500px;
    height:300px;
    background:yellow
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
`;
  return (
    <StyledContainer center={true}>
      <Title>Location</Title>

      <MediumSpacing />
      <Card>
        <CardContent>
          <h3>1285 W 9th Street - Silver Springs, NV</h3>
          <br />
          <Map>
            <Iframe
              width="500"
              height="300"
              loading="lazy"
              src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJweP4SCH4mIARCjF3dZ3bpEQ&key=AIzaSyCd8xV4M_6TitnfCMnc3sh-TNDGvM7d0TY">
            </Iframe>
          </Map>
          <MediumSpacing />
          </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default Location;
