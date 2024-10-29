import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import StyledContainer from '../views/StyledContainer';
import {
  Card,
  CardContent,
  CardHeader,
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
        <CardContent>
          Welcome to Luminescence Software! We are a software company dedicated
          high quality applications to make our lives easier. This company was
          started to make simple applications to make daily life easier, and has
          grown to much more. We currently provide a fundraising platform, and
          are working on our main product which is a meal planner and organizer.
          Please select your desired product above to get started.
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default Home;
