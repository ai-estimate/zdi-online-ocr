import React from "react";
import Layout from "src/components/Layout";

// eslint-disable-next-line react/display-name
const MyFilePage = React.memo(() => {
  return (
    <Layout title="My File - DZI OCR ONLINE">
      <h3>
        Register now to use this service! You can use ZDI OCR Online to store
        and manage your converted files, but you have to be a registered user.
        You can sign up here. Here&apos;s a sneak peak of what your personal
        inbox in ZDI OCR Online will look like:
      </h3>
    </Layout>
  );
});

export default MyFilePage;
