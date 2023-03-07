import React from "react";
import { AppProps } from "next/app";
import "styles/index.css";
import "styles/styles.scss";
import ZDIThemeProvider from "@zdi/mui";
import { SnackbarProvider } from "notistack";
// import { Provider } from "react-redux";

const MyApp: React.FC<AppProps> = ({ Component, ...rest }) => {
  return (
    <ZDIThemeProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={16000}>
        <Component {...rest} />
      </SnackbarProvider>
    </ZDIThemeProvider>
  );
};
export default MyApp;
