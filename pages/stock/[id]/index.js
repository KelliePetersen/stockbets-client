import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout";
import Chart from "../../../components/Chart";

const VariablePage = ({stockData, priceData}) => {
  const router = useRouter();
  const {id} = router.query;
  const items = [];

  const [data, setData] = useState([25, 30, 45, 60, 15, 30, 75, 100, 50, 25]);

  priceData.map(stock => {
    items.push(<li key={stock.label}>{stock.label}: {stock.average}</li>);
  });

  return (
    <div onClick={() => console.log(priceData[10].average)}>
      <Head>
        <title>{stockData.symbol} | {stockData.companyName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main style={{padding: '100px 0'}}>
          <h1>{stockData.symbol}: ${stockData.latestPrice}</h1> 
          <p>{stockData.companyName}</p>
          <p>{priceData.average}</p>
          <Chart data={data} />
          <ul>
            {items}
          </ul>
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </main>
      </Layout>
    </div>
  )
}

VariablePage.getInitialProps = async ({query}) => {
  const [stockData, priceData] = await Promise.all([
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/quote?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json()),
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/intraday-prices?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json())
  ]);
  return { stockData, priceData };
}

export default VariablePage;
