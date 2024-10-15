import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.div`
background: black;
border-radius: 10px
box-shadow: 8px 8px 17px -2px rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: column;
height: 100%;
`

const CardContent = styled.div`
display: flex;
flex-basis: 100%;
flex-direction: column;
padding: 24px;
`

const CardHeader = styled.header`
display: flex;
flex-direction: column;
justify-content: space-between;
font-weight: 700;
padding: 2em 1.5em 0;

@media (min-width: 576px) {
  align-items: center;
  flex-direction: row;
}
`

const GridStyle = styled.div`
display: grid;
grid-gap: 0em 3em;
> div {
  display: flex;
  align-items: center;
}

> header {
  font-weight: bold;
  padding-top: 1.3em;
}

@media (min-width: 576px) {
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

/**
 * Simple pop up message with green or red background
 * @param props
 * @returns
 */
function Grid(props: any) {
  return (
    <Card>
      <CardContent>
      <GridStyle>
      <header>Name</header>
      <div>Words words</div>
      <header>NAme2</header>
      <div>Words Worsd2</div>
    </GridStyle>
      </CardContent>
      </Card>
  );
}

export default Grid;

Grid.propTypes = {
  // showPopUP: PropTypes.bool.isRequired,
  // togglePopUp: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired,
  // good: PropTypes.bool.isRequired,
  // message: PropTypes.string.isRequired,
};
