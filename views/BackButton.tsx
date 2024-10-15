import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function BackButton(props: any) {
  return (
    <Button
      variant="secondary"
      onClick={() => props.router.back()}
      hidden={props.hidden}
    >
      &larr; {props.children}
    </Button>
  );
}

export default BackButton;

BackButton.propTypes = {
  children: PropTypes.any.isRequired,
  router: PropTypes.any.isRequired,
  hidden: PropTypes.bool
};
