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
      <Title>Welcome to Luminescence Software</Title>
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
      <GridStyle>
        <HalfCard>
          <CardHeader>Luminescence Fundraising</CardHeader>
          <CardContent>
            A fundraising platform dedicated to keeping costs as low as possible
            for our customers. We believe fundraising should not be a source of
            income for an external company, and that as much of the donated
            money makes its way to the intended source.
          </CardContent>
        </HalfCard>
        <HalfCard>
          <CardHeader>Luminescence Meal Planner</CardHeader>
          <CardContent>
            Coming Soon...<br/>
            One annoying part of the week is to decide what the meals for each day will be. 
            With Luminescence&apos;s meal planner, you will be able to auto generate your weekly
            plan based off of your inputted recipes, as well as restrictions you put on each 
            day(time limit, price limit, food type, etc.). You will then be able to print out 
            your weeks grocery list, or even get it sent directly to your door. You will also 
            be able to get recipes submitted by others to expand your culinary experiences.
          </CardContent>
        </HalfCard>
      </GridStyle>
    </StyledContainer>
  );
};

export default Home;
