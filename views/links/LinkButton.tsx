import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";
/* white
  background: #e8ecf2;
  color: #000000;
  border: 2px solid #e8ecf2;

  border-radius: 9999px;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8),
  5px 5px 10px rgba(0, 0, 0, 0.25);
  }
  .neu-btn:hover {
    box-shadow: -1px -1px 5px rgba(255, 255, 255, 0.6),
      1px 1px 5px rgba(0, 0, 0, 0.3),
      inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 2px 2px 4px rgba(0, 0, 0, 0.3);
  } */


const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  width: 110px;
  height: 30px;
  display: inline-block;
  -webkit-translation: all;
  -webkit-translation-duration: 250ms;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0;
  margin-left: 10px;

  background: var(--color-offWhite);
  /*same as background*/
  color: black;
  border: 2px solid var(--color-offWhite);

  border-radius: 9999px;
  // box-shadow: -5px -5px 10px #c5c9ce,
  //     5px 5px 10px #ffffff;

  &:hover {
    box-shadow: -1px -1px 5px #c5c9ce,
        1px 1px 5px #ffffff,
        inset -2px -2px 5px #c5c9ce,
        inset 2px 2px 4px #ffffff;
  }
`;

/**
 * Button for links
 * @param props
 * @returns
 */
function LinkButton(props: any) {
  return (
    <Link href={props.url} hidden={props.hidden}>
      <StyledButton>{props.children}</StyledButton>
    </Link>
  );
}

export default LinkButton;

LinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  hidden: PropTypes.bool
};
