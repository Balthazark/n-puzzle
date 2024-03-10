import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open Sans", sans-serif;
  }
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  `;
