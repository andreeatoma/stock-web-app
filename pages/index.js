import Head from 'next/head';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import Stocks from '../components/Stocks/Stocks';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
      <Stocks />
      </main>
      <footer className="footer">
        <a
          href="https://github.com/andreeatoma"
          target="_blank"
          rel="noopener noreferrer"
        >
         Made with <FontAwesomeIcon width="24" icon={faCoffee} /> and passion by 
          Diana
        </a>
      </footer>
    </div>
  )
}
