import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import { ROWS, COLUMNS } from "../config";
import Board from "../components/Board";

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Board rows={ROWS} columns={COLUMNS}></Board>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>N-puzzle Home Page</title>;
