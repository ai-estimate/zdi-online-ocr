import React from "react";
import Layout from "src/components/Layout";
import Home from "src/views/Home";

// eslint-disable-next-line react/display-name
const HomePage = React.memo(() => {
  return (
    <Layout title="DZI OCR ONLINE">
      <Home />
    </Layout>
  );
});

export default HomePage;
