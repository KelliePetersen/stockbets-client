import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Signup = () => {
  const router = useRouter();

  const onSignup = (e) => {
    e.preventDefault();
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>Signup | Stockbets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <input placeholder="Username" />
        <input placeholder="Password" type="password" />
        <button onClick={onSignup} type="button">Sign In</button>
      </Layout>
    </>
  )
}

export default Signup;