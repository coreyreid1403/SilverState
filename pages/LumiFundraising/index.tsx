import type { NextPage } from 'next';
import StyledContainer from '../../views/StyledContainer';
import {
  Card,
  CardContent,
  CardHeader,
  GridStyle,
  HalfCard,
  MediumSpacing,
  Title
} from '../../styles/SharedStyles';

const FundraisingHome: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Title>Welcome to Luminescence Fundraising</Title>
      <MediumSpacing />
      <Card>
      <CardHeader>Donators</CardHeader>
        <CardContent>
          If you are here to donate to a team or organization, please select the donate link above 
          (click the hamburger button to reveal links). Then you will be able to select the Organization
          and the individual you want to donate to. 
        </CardContent>
      </Card>
      <MediumSpacing />
      <Card>
      <CardHeader>Coaches and Organization leaders</CardHeader>
        <CardContent>
          We are a fundraising platform dedicated to keeping costs as low as
          possible for our customers. We believe fundraising should not be a
          source of income for an external company, and that as much of the
          donated money makes its way to the intended source. We charge the bare
          minimum we can, just keeping the site on the web. We strive to lower
          our prices with each new customer we help.
        </CardContent>
      </Card>
      <GridStyle>
        <HalfCard>
          <CardHeader>Getting Started</CardHeader>
          <CardContent>
            To set up a fundraiser, please sign up with the link above (Click
            the hamburger above to see links) and request your team/organization
            be added to the list.
          </CardContent>
        </HalfCard>
        <HalfCard>
          <CardHeader>Fees</CardHeader>
          <CardContent>
            Fees include: 3% + $.30 for card encryption/security, and 3% for
            website cost. We provide an option on the donation form for the
            donator to opt to pay these Fees for you, on top of their current
            donation. We also advise them to pay by check or cash to avoid these
            fees.
          </CardContent>
        </HalfCard>
      </GridStyle>
    </StyledContainer>
  );
};

export default FundraisingHome;
