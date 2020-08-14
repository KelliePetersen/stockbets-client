import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout";

const VariablePage = ({title, body}) => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>{title}</h1> 
        <p>This is the variable page at URL: {id}</p>
        <p>{body}</p>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </Layout>
    </div>
  )
}

VariablePage.getInitialProps = async ({query}) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
  const post = res.json();
  return post;
}

export default VariablePage;
