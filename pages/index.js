import Head from 'next/head'
import Layout from '../components/Layout';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    padding: '150px 0 0',
    textAlign: 'center',
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 130px)',
      padding: '20vh 0 100px',
    }
  },
  heading: {
    width: '90%',
    maxWidth: '650px',
    fontSize: '2rem',
    fontWeight: '500',
    letterSpacing: '0px',
    margin: '0 auto 50px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem'
    }
  },
  signup: {
    width: '100%',
    height: '50px',
    display: 'inline-block',
    position: 'absolute',
    bottom: '20px',
    left: '0',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
      position: 'static'
    }
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>Stockbets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <h1 className={classes.heading}>
          A place for professionals to share insights and predictions on the stock market.
        </h1>
        <Button variant="contained" color="primary" size="large" className={classes.signup}>Sign Up</Button>
      </main>
    </Layout>
  )
}

export default Home;