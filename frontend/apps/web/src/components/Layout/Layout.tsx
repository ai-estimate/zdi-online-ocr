import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./Header";

type Props = {
  children?: ReactNode;
  title?: string;
  user: any;
  loading?: boolean;
  headerShown?: boolean;
};
const Layout: React.FC<Props> = ({
  children,
  headerShown = true,
  title = "This is the default title",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledRootWrapper id="map-z1-dashboard">
        {headerShown && <Header />}
        {children}
      </StyledRootWrapper>
    </>
  );
};

const StyledRootWrapper = styled.main`
  flex-grow: 1;
  /* overflow-y: auto; */
  height: 100vh;
  max-height: 100%;
`;

export default Layout;
