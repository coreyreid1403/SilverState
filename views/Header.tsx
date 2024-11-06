import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';
function Header(props: any) {
  return (
    // eslint-disable-next-line @next/next/no-script-component-in-head
    <Head>
      <title>Silver State</title>
      <meta name="description" content="Silver State Winery and Vineyard" />
      <meta name="keywords" content="Wine, Reno winery, winery, vineyard, Reno vineyard, silver spring winery" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Header;

Header.propTypes = {};
