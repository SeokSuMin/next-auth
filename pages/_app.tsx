import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// html body의 루트 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
