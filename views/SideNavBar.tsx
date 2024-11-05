import { MDBContainer, MDBNavbar, MDBNavbarToggler } from 'mdb-react-ui-kit';
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../public/OtherImages/Logo/logo.gif";
import styled from 'styled-components';

const StyledMDBContainer = styled(MDBContainer)`
`;

function SideNavBar(props: any) {
  const [showAnimated, setShowAnimated] = useState(false);

  return (
    <Sidebar collapsed={!showAnimated} backgroundColor={"var(--color-offWhite)"}>
      {/* <Menu>
      <MDBNavbar dark bgColor="dark">
      <MDBContainer>
        <MDBNavbarToggler
          type="button"
          className="first-button"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowAnimated(!showAnimated)}
        >
          <div className={`animated-icon1 ${showAnimated && 'open'}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </MDBNavbarToggler>
      </MDBContainer>
      </MDBNavbar>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
      <Link href="/">
      <Image
            className={styles.facebook}
            src={logo}
            height={80}
            width={80}
            alt="Logo"
          />
        </Link> */}
    </Sidebar>
  );
}

export default SideNavBar;
