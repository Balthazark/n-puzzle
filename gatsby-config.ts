import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `N-puzzle`,
    siteUrl: `https://karl-n-puzzle.netlify.app`,
  },
  plugins: ["gatsby-plugin-styled-components"],
};

export default config;
