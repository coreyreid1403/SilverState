import { MDBTooltip } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToolTipIcon from '../public/assets/Icons/tooltip.png';
import ToolTipIconInvert from '../public/assets/Icons/tooltipInvert.png';
import Image from 'next/image';

// const StyledMDBTooltip = styled(MDBTooltip)`
//   height: 5px;
//   width: 5px;
// `;

const StyledImage = styled(Image)`
  height: 15px;
  width: 15px;
`;

/**
 * Tool tip
 * @param props
 * @returns
 */
function ToolTip(props: any) {
  return (
    <MDBTooltip
      tag="a"
      wrapperProps={{ href: '#' }}
      title= {props.message}
    >
      {props.invert ? (
        <StyledImage src={ToolTipIcon} alt="ToolTip" />
      ) : (
        <StyledImage src={ToolTipIconInvert} alt="ToolTip" />
      )}
    </MDBTooltip>
  );
}

export default ToolTip;

ToolTip.propTypes = {
  message: PropTypes.string.isRequired,
  invert: PropTypes.bool
};
