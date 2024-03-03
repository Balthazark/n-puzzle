import React, { ReactNode } from "react";
import { lightTheme } from "../styles/Themes";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

const Layout = (props: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <React.Fragment>
        <GlobalStyle />
        {props.children}
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Layout;
