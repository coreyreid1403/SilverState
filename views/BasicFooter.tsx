import 'bootstrap/dist/css/bootstrap.min.css';

import PropTypes from 'prop-types'
import styled from 'styled-components';

const StyledFooter = styled.footer`
flex: 1;
padding: 2rem 0;
border-top: 1px solid #eaeaea;
justify-content: center;
align-items: center;
text-align: center;
color:white;
background-color: var(--color-offWhite);
`;

function BasicFooter(props: any){
return (
  <StyledFooter>
    <p>Luminescence Software </p>
    <p>
      Copyright: <span id="currentYear">© {props.date}</span>
    </p>
  </StyledFooter>
);
}

export default BasicFooter;

BasicFooter.propTypes = {
  date: PropTypes.string.isRequired,
};