import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function LocalButton(props: any) {
  return (
    <Button variant="dark" onClick={props.onClick} hidden={props.hidden}>
      {props.children}
    </Button>
  );
}

export default LocalButton;

LocalButton.propTypes = {
  children: PropTypes.any.isRequired,
  hidden: PropTypes.bool,
  onClick: PropTypes.func
};
