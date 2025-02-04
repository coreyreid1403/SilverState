/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import StyledContainer from '../views/StyledContainer';
import { Description, OuterGlowTitle } from '../styles/SharedStyles';

const NotFound: NextPage = () => {
  const [width, setWidth] = useState(0);

  

  const useMediaQuery = (width: any) => {  
    const updateTarget = useCallback((e: any) => {
      if (window.innerWidth > width) {
        console.log('Large');
      } else {
        console.log('Small');
      }
    }, []);
  
    useEffect(() => {
      window.addEventListener("resize", updateTarget);
  
      return () => window.removeEventListener("resize", updateTarget);
    }, []);

  };
  const isBreakpoint = useMediaQuery(768);
  return (
    <StyledContainer center={true}>
        <OuterGlowTitle>404</OuterGlowTitle>
        <Description>Oh no! not a 404!</Description>
    </StyledContainer>
  );
};

export default NotFound;
