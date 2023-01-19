import React from "react";
import { AppProps } from "next/app";
import "styles/index.css";
import "styles/styles.scss";
import { wrapper } from "@redux/store";
import ZDIThemeProvider, { DialogProvider } from "@zdi/mui";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

const MyApp: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const pageProps = props.pageProps;

  return (
    <ZDIThemeProvider>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} autoHideDuration={16000}>
          <DialogProvider>
            <Component {...pageProps} />
          </DialogProvider>
        </SnackbarProvider>
      </Provider>
    </ZDIThemeProvider>
  );
};
export default MyApp;
