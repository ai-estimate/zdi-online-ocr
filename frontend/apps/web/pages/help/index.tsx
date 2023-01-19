import React from "react";
import Layout from "src/components/Layout";

// eslint-disable-next-line react/display-name
const HomePage = React.memo(() => {
  return (
    <Layout title="Help - DZI OCR ONILE">
      <h3>
        Need help converting or compressing a file, or have questions about our
        service? Just click on one of the commonly asked questions below to see
        our answer. If you can’t find the answer you need, then please contact
        our support team, who will be happy to help.
      </h3>
    </Layout>
  );
});

export default HomePage;
