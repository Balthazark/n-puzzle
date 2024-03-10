import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import { ROWS, COLUMNS } from "../config";
import Board from "../components/Board";
import styled from "styled-components";

const IndexPage = () => {
  return (
    <Layout>
      <Header>
        <h1>N-puzzle</h1>
      </Header>
      <main>
        <Board rows={ROWS} columns={COLUMNS}></Board>
      </main>
    </Layout>
  );
};

export default IndexPage;

const Header = styled.header`
  font-size: clamp(1rem, 1vw + 0.5rem, 4rem);
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const Head: HeadFC = () => <title>N-puzzle Home Page</title>;
