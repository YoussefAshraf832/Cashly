import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#795934",
    secondary: "#d6c99e",
    lighter: "#f5f2e5",
    background: "#f0f0f0",
    surface: "#643c1c",
    accent: "#937953",
    muted: "#6b5d2d",
    text: "#3c2c1c",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "20px",
    xl: "24px",
    xxl: "32px",
  },
  borderRadius: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "20px",
    xl: "24px",
    xxl: "32px",
  },
  transition: "0.3s",
  shadows: {
    soft: "0 2px 4px rgba(121, 89, 52, 0.1)",
    medium: "0 4px 8px rgba(121, 89, 52, 0.2)",
    strong: "0 6px 12px rgba(60, 44, 28, 0.3)",
    accent: "0 0 0 3px rgba(147, 121, 83, 0.3)",
    surface: "0 4px 6px rgba(100, 60, 28, 0.25)",
  },
};

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    min-height: 100%;
    max-height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

`;
