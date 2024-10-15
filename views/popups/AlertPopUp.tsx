import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import PropTypes from "prop-types";

/**
 * Simple pop up message with green or red background
 * @param props
 * @returns
 */
function AlertPopUp(props: any) {
  return (
    <div className="sticky">
      <ToastContainer className="p-3" position={"top-center"}>
        <Toast
          show={props.showPopUP}
          onClose={props.togglePopUp}
          delay={props.good ? 2500 : 5500}
          autohide
          bg={props.good ? "primary" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">{props.title}</strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default AlertPopUp;

AlertPopUp.propTypes = {
  showPopUP: PropTypes.bool.isRequired,
  togglePopUp: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  good: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
