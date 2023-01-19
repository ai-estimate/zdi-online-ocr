import { useRouter } from "next/router";
import React, { useEffect } from "react";

// eslint-disable-next-line react/display-name
const IndexPage = React.memo(() => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, []);
  return null;
});

export default IndexPage;
