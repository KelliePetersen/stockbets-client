import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Login = () => {
  const router = useRouter();

  const onLogin = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <input placeholder="Username" />
        <input placeholder="Password" type="password" />
        <button onClick={onLogin} type="button">Sign In</button>
      </Layout>
    </>
  )
}

export default Login;