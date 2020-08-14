import Head from 'next/head'
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Stockbets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Welcome to Stockbets. Place bets on your bets.
        </h1>
      </main>
    </Layout>
  )
}

export default Home;