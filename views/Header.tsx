import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';
function Header(props: any) {
  return (
    // eslint-disable-next-line @next/next/no-script-component-in-head
    <Head>
      <title>Luminescence Software</title>
      <meta name="description" content="Luminescence Software, a software company giving back to the community" />
      <meta name="keywords" content="luminescencesoftware, LuminescenceSoftware, Luminescence, Software, Luminescence Software, Fundraiser, School Fundraiser, sports fundraiser, fundraiser management" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Header;

Header.propTypes = {};
