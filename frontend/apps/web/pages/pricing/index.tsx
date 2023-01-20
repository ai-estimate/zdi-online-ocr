import Head from "next/head";
import React from "react";
import Layout from "src/components/Layout";
import Pricing from "src/views/Pricing";

// eslint-disable-next-line react/display-name
const PricePage = React.memo(() => {
  return (
    <Layout title="Pricing - ZDI OCR ONLINE">
      <h3>
        Grab an account today! Unlimited daily conversions Convert larger files
        Faster file conversions
      </h3>
      <Pricing />
    </Layout>
  );
});

export default PricePage;
