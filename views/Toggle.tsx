import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types'

function Toggle(props: any){
return (
  <Form>
    <Form.Check
      type="switch"
      id={props?.id}
      label={props.title}
      onChange={props.onSwitchClick}
      checked={props.checked}
    />
  </Form>
);
}

export default Toggle;

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  onSwitchClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};