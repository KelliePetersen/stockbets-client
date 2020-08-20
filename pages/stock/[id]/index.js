import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Error from "../../_error";
import Layout from "../../../components/Layout";
import Chart from "../../../components/Chart";
import CommentContainer from "../../../components/CommentContainer";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '90vw',
    maxWidth: '800px',
  },
  chart: {
    height: '90vw',
    maxHeight: '400px',
    margin: '20px 0'
  },
  heading: {
    wordSpacing: '5px',
    marginTop: '10px'
  }
}));

const StockPage = ({stockData, priceData}) => {
  const classes = useStyles();
  const items = [];
  const [data, setData] = useState([]);

  let cache = stockData.open || stockData.previousClose;
  priceData.map((stock) => {
    items.push({"time": stock.label, "price": stock.average ? stock.average.toFixed(2) : cache});
    cache = stock.average || cache;
  });

  return (
    <div>
      <Head>
        <title>{stockData.symbol} | {stockData.companyName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main style={{padding: '100px 0'}}>
          <div className={classes.wrapper}>
            <p>{stockData.companyName}</p>
            <h1 className={classes.heading}>{stockData.symbol} {stockData.latestPrice}</h1> 
            <div className={classes.chart}>
              <Chart data={items} />
            </div>
            {/* TODO Fetch comment data linked to stock in database */}
            <CommentContainer />
          </div>
        </main>
      </Layout>
    </div>
  )
}

StockPage.getInitialProps = async ({query}) => {
  const [stockData, priceData] = await Promise.all([
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/quote?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json()),
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/intraday-prices?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json())
  ]);
  return { stockData, priceData };
}

export default StockPage;
