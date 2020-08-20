import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from "@material-ui/core";
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
    margin: '30px 0 20px'
  },
  heading: {
    wordSpacing: '5px',
    margin: '10px 0 0'
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
            <h1 className={classes.heading}>{stockData.symbol} {stockData.latestPrice} {(stockData.change).toFixed(2)} ({(stockData.changePercent * 100).toFixed(2)})% </h1>
            <p style={{color: '#666'}}>Updated {priceData[0].date} {stockData.latestTime}</p>
            <div className={classes.chart}>
              <Chart data={items} />
            </div>
            <Grid container wrap="nowrap" spacing={2}>
              <p style={{color: '#000'}}>Previous close 
                <span style={{color: '#666'}}> {stockData.previousClose || stockData.iexClose || `-`}</span>
              </p>
              <p style={{color: '#000'}}>Open 
                <span style={{color: '#666'}}> {stockData.open || stockData.iexOpen || '---'}</span>
              </p>
              <p style={{color: '#000'}}>Low 
                <span style={{color: '#666'}}> {stockData.low || '---'}</span>
              </p>
              <p style={{color: '#000'}}>High 
                <span style={{color: '#666'}}> {stockData.high || '---'}</span>
              </p>
              <p style={{color: '#000'}}>52 wk Low 
                <span style={{color: '#666'}}> {stockData.week52Low || '---'}</span>
              </p>
              <p style={{color: '#000'}}>52 wk High 
                <span style={{color: '#666'}}> {stockData.week52High || '---'}</span>
              </p>
              <p style={{color: '#000'}}>PE Ratio 
                <span style={{color: '#666'}}> {stockData.peRatio || '---'}</span>
              </p>
              <p style={{color: '#000'}}>Market Cap 
                <span style={{color: '#666'}}> {stockData.marketCap || '---'}</span>
              </p>
              <p style={{color: '#000'}}>Volume 
                <span style={{color: '#666'}}> {stockData.volume || stockData.iexVolume || '---'}</span>
              </p>
            </Grid>
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
