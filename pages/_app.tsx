import '../styles/globals.css';
import '../styles/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Header from '../views/Header';
import Hamburger from '../views/links/Hamburger';
import styled from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import Footer from '../views/Footer';
 
export const metadata: Metadata = {
  description: 'Luminescence Software, a software company giving back to the community',
  keywords: "luminescencesoftware, LuminescenceSoftware, Luminescence, Software, Luminescence Software"
}

const MainContainer = styled.div`
  color: black;
  background-color: var(--color-blue);
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContainer>
      <Header />

      <Hamburger />

      {/* Body */}
        <Component {...pageProps} />

      <Footer />

      {/* Tracking Components from vercel */}
      <Analytics />
      {/* <SpeedInsights /> */}
    </MainContainer>
  );
}

export default MyApp;
