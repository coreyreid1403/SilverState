import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import PropTypes from 'prop-types'

/**
 * Informational drop down, no action
 * @param props The list to have on the drop down
 * @returns 
 */
function DropdownView(props: any){
  let items: string[] = [''];
  //check to make sure it all looks good before assigning items
  if (
    props.items?.length > 0 &&
    typeof props.items === "object" &&
    !(props.items.length === 1 && props.items[0] === undefined)
  ) {
    items = props.items;
  }
return (
  <DropdownButton title={items[0] ?? 'undefined'} variant="secondary">
    {items.map((item: string) => {
      return <Dropdown.Item key={item}>{item}</Dropdown.Item>;
    })}
  </DropdownButton>
);
}

export default DropdownView;

DropdownView.propTypes ={
  items: PropTypes.array
}