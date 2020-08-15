import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout";

const VariablePage = (stockData, priceData) => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div>
      <Head>
        <title>{stockData.symbol}: {stockData.companyName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main style={{padding: '100px 0'}}>
          <h1>{stockData.symbol}: ${stockData.latestPrice}</h1> 
          <p>{stockData.companyName}</p>
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </main>
      </Layout>
    </div>
  )
}

VariablePage.getInitialProps = async ({query}) => {
  // const res = await fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/quote?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`);
  // const post = res.json();
  // return post;

  const [stockData, priceData] = await Promise.all([
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/quote?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json()),
    fetch(`https://sandbox.iexapis.com/stable/stock/${query.id}/intraday-prices?token=Tpk_d6cb491dc2a54a79a74012c3d4564673`).then(r => r.json())
  ]);

  return { stockData, priceData };
}

//KEYS /stock/{symbol}/quote
// symbol, companyName, primaryExchange, calculationPrice, open, openTime, openSource, close, closeTime, closeSource, high, highTime, 
// highSource, low, lowTime, lowSource, latestPrice, latestSource, latestTime, latestUpdate, latestVolume, iexRealtimePrice, 
// iexRealtimeSize, iexLastUpdated, delayedPrice, delayedPriceTime, oddLotDelayedPrice, oddLotDelayedPriceTime, extendedPrice, 
// extendedChange, extendedChangePercent, extendedPriceTime, previousClose, previousVolume, change, changePercent, volume, 
// iexMarketPercent, iexVolume, avgTotalVolume, iexBidPrice, iexBidSize, iexAskPrice, iexAskSize, iexOpen, iexOpenTime, iexClose, 
// iexCloseTime, marketCap, peRatio, week52High, week52Low, ytdChange, lastTradeTime, isUSMarketOpen

export default VariablePage;
