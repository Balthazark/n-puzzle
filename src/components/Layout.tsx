import React, { ReactNode } from "react";
import { lightTheme } from "../styles/Themes";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

const Layout = (props: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>{props.children}</ThemeProvider>
    </React.Fragment>
  );
};

export default Layout;
