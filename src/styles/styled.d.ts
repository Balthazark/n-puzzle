import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      tile: string;
      text: string;
      textSecondary: string;
      primaryAccent: string;
      secondaryAccent: string;
    };
  }
}
