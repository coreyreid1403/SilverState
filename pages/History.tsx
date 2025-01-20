import type { NextPage } from 'next';
import { MediumSpacing, CardContent, HalfCard, Title, Card, Center, Spacing } from '../styles/SharedStyles';
import StyledContainer from '../views/StyledContainer';
import { CardHeader } from 'react-bootstrap';

const History: NextPage = () => {
  return (
    <StyledContainer center={true}>
      <Spacing></Spacing>
      <Title>History</Title>

      <MediumSpacing />
      <Card>
        <CardContent>
          First Chapter <b/>
          Silver State was started by John and Sina Lenox in 2008. John and Sina were life long farmers. John grew
          up in Oxnard California and was the son of a long line of farmers from 1903 starting with E.E. Lenox.
          John worked on his family farm as a boy, growing things such as lima beans and lemons. John went to
          Organ State University to study agriculture. He met his future wife Sina, while at college. They
          married, then John graduated and started serving in the US Army as a pilot in Vietnam.
          John and Sina had 4 children, Debbie, John, Mike and Ginger. After returning from the war John and Sina
          brought the family home to Oxnard California to start farming and raise there family. John and Sina grew
          lima beans, and tomatoes. They purchased 1000 acres in Austin Nevada to eventually live and
          work the land. In 1979 John and Sina moved their family to Nevada full time to grow grain and alfalfa
          on a 1000 acer farm. They grew alfalfa, grain, and raised cattle. John and Sina retired to Silver
          Springs, in order to travel more. In 2008 John and Sina tried the experiment of starting a Vineyard. You
          can take the farmer off the farm but cannot take the farming out of the farmer. In 2008 John, Sina and
          their son Mike started the task of creating the Vineyard. They planted 250 vines Merlot, Chardonnay,
          Riesling, Pinot Grigio, Pinot Noir, to start. John, Sina and Mike worked and continued to grow the
          vineyard, to 1200 vines. They named the vineyard 9 th Street .
          <b/>
          The next chapter in 2015 Mike and Christine Lenox purchased the Vineyard. The vineyard grown to
          approximately 1500 vines. Mike and Christine venture started off tending to the vines, making wine, to
          share with family and friends. In 2019 Mike and Christine made the decision to share the beauty of
          vineyard. In 2020 started the process of becoming a commercial winery and changed the name to Silver
          State Vineyard and Winery. Our goals is to highlight the diversity and beauty Nevada has to offer our
          neighbors, community, and visitors. Our passion is in growing the grapes and making good wine. We are
          learning every day, which is our definition of a great life. Our dream is to share the vineyard and our
          wine. We would love for people to come visit, see the beauty of the vine, the beautiful sunsets and
          make new friends.
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default History;
