import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle
} from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Skeleton from '../Skeleton';

const StyledMDBModalContent = styled(MDBModalContent)`
  background: var(--color-grey);
  border-color: var(--color-teal);
  color: white;
`;

const StyledMDBModalHeader = styled(MDBModalHeader)`
  border-color: var(--color-teal);
  color: white;
`;

const StyledMDBModalFooter = styled(MDBModalFooter)`
  border-color: var(--color-teal);
  color: white;
`;

/**
 * Pop up window
 * @param props
 * @returns
 */
function VerifyPopUpWindow(props: any) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  function OnAccept() {
    console.log('clicked');
    props.buttonClick();
    toggleOpen();
  }

  return (
    <>
      {isBrowser && !props.hidden ? (
        <>
          {props.buttonStyle === 'dark' ? (
            <>
            <Button variant="dark" onClick={toggleOpen}>
                {props.buttonName}
              </Button>
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

                    <StyledMDBModalFooter>
                      <Button variant="success" onClick={OnAccept}>
                        {props.submitButtonName}
                      </Button>
                    </StyledMDBModalFooter>
                  </StyledMDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </>
          ) : (
            <>
              <Button variant="outline-danger" onClick={toggleOpen}>
                {props.buttonName}
              </Button>
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

                    <StyledMDBModalFooter>
                      <Button variant="dark" onClick={OnAccept}>
                        {props.submitButtonName}
                      </Button>
                    </StyledMDBModalFooter>
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

export default VerifyPopUpWindow;

VerifyPopUpWindow.propTypes = {
  title: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  submitButtonName: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool,
  buttonStyle: PropTypes.string
};
