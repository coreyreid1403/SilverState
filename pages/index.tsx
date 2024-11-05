import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import StyledContainer from '../views/StyledContainer';
import {
  Card,
  CardContent,
  CardHeader,
  Center,
  GridStyle,
  HalfCard,
  MediumSpacing,
  Title
} from '../styles/SharedStyles';

const Home: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Welcome to Silver State Vineyard and Winery</Title>
      <MediumSpacing />
      <Card>
        <Center>
        <CardContent>
          A Northern Nevada local Winery
        </CardContent>
        </Center>
      </Card>
    </StyledContainer>
  );
};

export default Home;
