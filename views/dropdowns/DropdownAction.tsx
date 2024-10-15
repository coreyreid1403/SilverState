import Dropdown from 'react-bootstrap/Dropdown';

import PropTypes from 'prop-types'

/**
 * Dropdown with action on select
 * @param props 
 * @returns 
 */
function DropdownAction(props: any){
return(
  <Dropdown onSelect={props.action}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {props.selected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.items?.map((item: string) => {
          return(
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
)
}

export default DropdownAction;

DropdownAction.propTypes ={
  items: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}