import PropTypes from 'prop-types';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBModalBody
} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { RedBorder } from '../../styles/SharedStyles';
import Skeleton from '../Skeleton';

const StyledMDBModalContent = styled(MDBModalContent)`
  background: var(--color-grey);
  border-color: var(--color-teal);
`;

const StyledMDBModalHeader = styled(MDBModalHeader)`
  border-color: var(--color-teal);
`;

/**
 * Pop up window
 * @param props
 * @returns
 */
function FormPopUpWindow(props: any) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);
  useEffect(() => {
    if (props.windowOpen) {
      props.setWindowOpenFlag(false);
      toggleOpen();
    }
  }, [props.windowOpen]);

  return (
    <>
      {isBrowser ? (
        <>
          {props.buttonStyle === 'dark' ? (
            <>
              <RedBorder show={props.redBorder}>
                <Button variant="dark" onClick={toggleOpen}>
                  {props.buttonName}
                </Button>
              </RedBorder>
              <MDBModal
                nonInvasive
                open={basicModal}
                tabIndex="-1"
              >
                <MDBModalDialog>
                  <StyledMDBModalContent>
                    <StyledMDBModalHeader>
                      <MDBModalTitle>{props.title}</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="danger"
                        onClick={toggleOpen}
                      ></MDBBtn>
                    </StyledMDBModalHeader>
                    <MDBModalBody>{props.children}</MDBModalBody>
                  </StyledMDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </>
          ) : (
            <>
              <RedBorder show={props.redBorder}>
                <Button variant="outline-success" onClick={toggleOpen}>
                  {props.buttonName}
                </Button>
              </RedBorder>
              <MDBModal
                nonInvasive
                open={basicModal}
                tabIndex="-1"
              >
                <MDBModalDialog>
                  <StyledMDBModalContent>
                    <StyledMDBModalHeader>
                      <MDBModalTitle>{props.title}</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="danger"
                        onClick={toggleOpen}
                      ></MDBBtn>
                    </StyledMDBModalHeader>
                    <MDBModalBody>{props.children}</MDBModalBody>
                  </StyledMDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </>
          )}
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
}

export default FormPopUpWindow;

FormPopUpWindow.propTypes = {
  title: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  windowOpen: PropTypes.bool.isRequired,
  setWindowOpenFlag: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
  redBorder: PropTypes.bool
};
