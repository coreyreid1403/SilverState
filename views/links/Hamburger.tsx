import React, { useCallback, useEffect, useState } from 'react';
import { MDBNavbar, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { Router, useRouter } from 'next/router';
import HomeLinks from './HomeLinks';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/OtherImages/Logo/logo2.gif';
import styled from 'styled-components';
import { InheritingLink } from '../../styles/SharedStyles';
import GlobalVariables from '../../util/GlobalVariables';

const FloatRight = styled.div`
  float: right;
  display: inline;
`;

const UserName = styled.div`
  display: inline;
  padding-right: 20px;
`;

const StyledMDBNavbar = styled(MDBNavbar)`
  padding-bottom: 0;
  padding-right: 15px;
  padding-left: 10px;
`;

const HamburgerContainer = styled.div`
  margin: 0;
  padding-left: 10px;
`;

const StyledMDBNavbarToggler = styled(MDBNavbarToggler)`
  // border-color: var(--color-blue);
`;

const LinksDiv = styled.div`
  padding-top: 10px;
`;

function Hamburger(props: any) {
  let globals = GlobalVariables.getInstance();
  const [showAnimated, setShowAnimated] = useState(false);
  const [largeScreen, setLargeScreen] = useState(true);
  const [user, setUser] = useState('');
  const [userLevel, setUserLevel] = useState('');

  const updateTarget = useCallback((e: any) => {
    if (window.innerWidth > 765) {
      setLargeScreen(true);
    } else {
      setLargeScreen(false);
    }
  }, []);

  useEffect(() => {
    updateTarget('');
    window.addEventListener('resize', updateTarget);

    getUser();

    //runs each url change, checks if user is logged in to see what links to show.
    Router.events.on('routeChangeStart', () => {
      getUser();
    });

    return () => window.removeEventListener('resize', updateTarget);
  }, [updateTarget]);

  const getUser = async () => {
    const user = await globals?.checkUser();
    if (user) {
      const coach = await globals?.getUser();
      if(coach){
        setUser(coach.userName);
        setUserLevel('Coach');
      }
    }
  };

  return (
    <>
      <section className="mb-3">
        <StyledMDBNavbar dark bgColor="dark">
          <HamburgerContainer>
            <StyledMDBNavbarToggler
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
            </StyledMDBNavbarToggler>
          </HamburgerContainer>
          <FloatRight>
            {user ? (
            <UserName>{userLevel} : {user}</UserName>
            ):(
              <UserName>
                <InheritingLink
              href={{
                pathname: "/LumiFundraising/login"
              }}
            >Log In</InheritingLink>
            </UserName>
            )

            }
            <Link href="/">
              <Image src={logo} height={60} width={60} alt="Logo" />
            </Link>
          </FloatRight>
        </StyledMDBNavbar>

        <LinksDiv>
          <HomeLinks showAnimated={showAnimated} largeScreen={largeScreen} />
        </LinksDiv>
      </section>
    </>
  );
}

export default Hamburger;

Hamburger.propTypes = {};
