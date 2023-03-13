import React from "react";
import { AppProps } from "next/app";
import ZDIThemeProvider from "@zdi/mui";
import { SnackbarProvider } from "notistack";

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
