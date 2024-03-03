import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <main>Hello world!</main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
