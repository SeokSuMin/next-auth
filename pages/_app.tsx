import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import Head from 'next/head';

// html body의 루트 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="all description" content="안녕하세요" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
