import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeContract } from "../utils/near";
import { useEffect, useState } from 'react';
import { AppWrapper } from '../context/state';
declare const window: any;


function MyApp({ Component, pageProps }: AppProps) {
  const [nearLoaded, setnearLoaded] = useState(false)

  useEffect(() => {
    window.nearInitPromise = initializeContract().then(() => {
      setnearLoaded(true)
    }).catch((err) => { console.log(err) });
  }, [])

  return nearLoaded && <AppWrapper><Component {...pageProps} /></AppWrapper>
}

export default MyApp
