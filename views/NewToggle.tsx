import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./toggle.module.css";

import React from 'react';
import styled from 'styled-components';

function NewToggle(props: any){

const Row = styled.div`
  display: table-row;
`;

return (
  <div id={styles.appCover}>
    <Row>
      <div className={styles.toggleButtonCover}>
        <div className={styles.buttonCover}>
          <div className={`${styles.button}  ${styles.b2}`}id={styles.button11}>
            <input type={styles.checkbox} className={styles.checkbox} />
            <div className={styles.knobs}>
              <span></span>
            </div>
            <div className={styles.layer}></div>
          </div>
        </div>
      </div>
    </Row>
  </div>
);
}

export default NewToggle;

// NewToggle.propTypes ={
//   onSwitchClick: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   checked: PropTypes.bool.isRequired
// }