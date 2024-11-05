import Link from 'next/link';
import PropTypes from 'prop-types';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDropDown = styled(DropdownButton)`
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
  color: #ffffff;
  border: 2px solid var(--color-offWhite);

  border-radius: 9999px;
  box-shadow:
    -5px -5px 10px #0d0f10,
    5px 5px 10px #353b42;

  &:hover {
    box-shadow:
      -1px -1px 5px #0d0f10,
      1px 1px 5px #353b42,
      inset -2px -2px 5px #0d0f10,
      inset 2px 2px 4px #353b42;
  }
`;

/**
 * Button for links
 * @param props
 * @returns
 */
//TODO: doesn't work
function LinkDropDown(props: any) {
  return (
    <StyledDropDown id={props.title} title={props.title}>
      {props.children.map( (child: { url: string; name: string;}) => {
        <Dropdown.Item href={child.url}>{child.name}</Dropdown.Item>
      })}
    </StyledDropDown>
  );
}

export default LinkDropDown;

LinkDropDown.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
