import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';

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
    margin: '0 auto 20px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem'
    }
  },
  text: {
    fontSize: '1rem', 
    lineHeight: '1.5', 
    marginBottom: '50px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    }
  },
  signup: {
    width: '100%',
    padding: '15px 0',
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

const PageNotFound = () => {
  const router = useRouter();
  const classes = useStyles();
  const stockPage = null;

  return (
    <Layout>
      <Head>
        <title>Page not found | Stockbets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        <h1 className={classes.heading}>
          Page not found
        </h1>
        { stockPage ? null : <p className={classes.text}>
          We could not find the page you're looking for.
        </p> }
        { stockPage ? <p className={classes.text}>
          We could not find a stock with the symbol <strong>{(router.asPath).substring(1)}</strong>. <br /> 
          Please check that you're searching by Stock Symbol and not company name.
        </p> : null }
        <Link href="/">
          <Button component="a" variant="contained" color="primary" size="large" className={classes.signup}>Go back Home</Button>
        </Link>
        <SearchInput />
      </main>
    </Layout>
  )
}

export default PageNotFound;