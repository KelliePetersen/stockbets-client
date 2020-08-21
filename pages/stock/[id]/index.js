import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
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
    display: 'inline-block',
    wordSpacing: '2px',
    margin: '10px 15px 0 0'
  },
  change: {
    display: 'inline-block', 
    fontSize: '1.25rem',
    margin: 0
  }
}));

const InfoItem = ({title, data}) => (
  <Grid item xs={4} sm={3} md={1} style={{minWidth: 'max-content', paddingBottom: 0}}>
    <p style={{color: '#000', margin: '0'}}>{title}
      <span style={{color: '#666', display: 'block'}}> {data}</span>
    </p>
  </Grid>
);

const StockPage = ({stockData, priceData, statusCode}) => {
  if (statusCode === 404) {
    return <Error statusCode={statusCode} />;
  }

  const classes = useStyles();
  const items = [];
  const [data, setData] = useState([]);
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up('md'));

  let cache = stockData.open || stockData.previousClose;
  priceData.map((stock) => {
    items.push({"time": stock.label, "price": stock.average ? stock.average.toFixed(2) : cache});
    cache = stock.average || cache;
  });

  const numFormatter = num => {
    if (Math.abs(num) > 999999999999) {
      return Math.sign(num)*((Math.abs(num)/1000000000000).toFixed(2)) + 'T' 
    } else if (Math.abs(num) > 999999999) {
      return Math.sign(num)*((Math.abs(num)/1000000000).toFixed(2)) + 'B' 
    } else if (Math.abs(num) > 999999) {
      return Math.sign(num)*((Math.abs(num)/1000000).toFixed(2)) + 'M' 
    } else if (Math.abs(num) > 999) {
      return Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' 
    }
    return Math.sign(num)*Math.abs(num)
  }

  return (
    <div>
      <Head>
        <title>{stockData.symbol} | {stockData.companyName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main style={{padding: '100px 0'}}>
          <div className={classes.wrapper}>
            <p style={{margin: 0}} >{stockData.companyName}</p>
            <h1 className={classes.heading}>{stockData.symbol} {stockData.latestPrice}</h1>
            <p className={classes.change} style={stockData.change > 0 ? {color: 'green'} : {color: 'red'}}>{(stockData.change).toFixed(2)} ({(stockData.changePercent * 100).toFixed(2)})%</p>
            <p style={{color: '#666'}}>Updated {stockData.latestTime}</p>
            <div className={classes.chart}>
              <Chart data={items} />
            </div>
            <Grid container direction="row" spacing={3} style={{marginTop: '20px', width: '100%', minWidth: '320px'}}  justify={breakpoint && 'space-between'}>
              <InfoItem title='Prev Close' data={stockData.previousClose || stockData.iexClose || '---'} />
              <InfoItem title='Open' data={stockData.open || stockData.iexOpen || '---'} />
              <InfoItem title='Low' data={stockData.low.toFixed(2) || '---'} />
              <InfoItem title='High' data={stockData.high.toFixed(2) || '---'} />
              <InfoItem title='52wk Low' data={stockData.week52Low || '---'} />
              <InfoItem title='52wk High' data={stockData.week52High || '---'} />
              <InfoItem title='PE Ratio' data={stockData.peRatio || '---'} />
              <InfoItem title='Market Cap' data={numFormatter(stockData.marketCap) || '---'} />
              <InfoItem title='Volume' data={numFormatter(stockData.volume) || numFormatter(stockData.iexVolume) || '---'} />
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
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/quote?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json()).catch(err => console.log(err.message)),
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/intraday-prices?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json()).catch(err => console.log(err.message))
  ])
  .catch(err => console.log(err.message));
  return { stockData: stockData || {}, priceData: priceData || {}, statusCode: stockData ? 200 : 404};
}

export default StockPage;
