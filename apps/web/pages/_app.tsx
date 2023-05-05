import React from 'react';
import 'tailwindcss/tailwind.css';
import {AppProps} from 'next/app';
import {SnackbarProvider} from 'notistack';
import createEmotionCache from '../src/createEmotionCache';
import ZDIThemeProvider from '@zdi/mui';
import {CacheProvider, EmotionCache} from '@emotion/react';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const MyApp: React.FC<MyAppProps> = ({Component, ...rest}) => {
  const {emotionCache = clientSideEmotionCache, pageProps} = rest;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>កម្មវិធីអក្សរខ្មែរ</title>
      </Head>
      <ZDIThemeProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={16000}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ZDIThemeProvider>
    </CacheProvider>
  );
};
export default MyApp;
