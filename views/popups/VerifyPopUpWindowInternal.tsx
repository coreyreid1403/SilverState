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
  border-color: var(--color-blue);
  color: white;
`;

const StyledMDBModalHeader = styled(MDBModalHeader)`
  border-color: var(--color-blue);
  color: white;
`;

const StyledMDBModalFooter = styled(MDBModalFooter)`
  border-color: var(--color-blue);
  color: white;
`;

/**
 * Pop up window
 * @param props
 * @returns
 */
function VerifyPopUpWindowInternal(props: any) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  function OnAccept() {
    props.buttonClick();
    props.toggleOpen();
  }

  return (
    <>
      {isBrowser && !props.hidden ? (
        <>
          <MDBModal
            nonInvasive
            open={props.basicModal}
            tabIndex="-1"
          >
            <MDBModalDialog>
              <StyledMDBModalContent>
                <StyledMDBModalHeader>
                  <MDBModalTitle>{props.title}</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="danger"
                    onClick={props.toggleOpen}
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
        <Skeleton />
      )}
    </>
  );
}

export default VerifyPopUpWindowInternal;

VerifyPopUpWindowInternal.propTypes = {
  title: PropTypes.string.isRequired,
  submitButtonName: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool
};
