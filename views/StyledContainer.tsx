import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tealImg from '../public/assets/backgroundTeal.png';
import purpleImg from '../public/assets/backgroundPurple.png';
import purpleImgInvert from '../public/assets/backgroundPurpleInvert2.png';
import background from '../public/assets/images/photos/vineArchWhite.jpg';

const StyledBackground = styled.div`
  background-image: url(${background.src});
  position: relative;
`;

const StyledMain = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
  z-index: 9;
`;

const CenterStyledMain = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  z-index: 9;
`;

const LeftImage = styled.div`
  background-image: url(${tealImg.src});
  width: 50%;
  height: 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: auto;
  display: block;
  z-index: 0;

  @media (max-width: 767px) {
    width: 100%;
    height: 70%;
    top: 0%;
    bottom: auto:
    left: 0%;
    right: 0%;
  }
`;

const RightImage = styled.div`
  background-image: url(${purpleImg.src});
  width: 50%;
  height: 100%;
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: auto;
  right: 0%;
  display: block;
  z-index: 0;

  @media (max-width: 767px) {
    background-image: url(${purpleImgInvert.src});
    width: 100%;
    height: 60%;
    top: auto;
    bottom: 0%:
    left: 0%;
    right: 0%;
  }
`;

function StyledContainer(props: any) {
  return (
    <StyledBackground>
      <LeftImage />
      <RightImage />
      {props.center ? (
        <CenterStyledMain>{props.children}</CenterStyledMain>
      ) : (
        <StyledMain>{props.children}</StyledMain>
      )}
    </StyledBackground>
  );
}

export default StyledContainer;

StyledContainer.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node.isRequired
};
