import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

  :root {
    --primary-color: #015F82;
    --text-color: #252525;
    --light-text-color: #747474;
    --background-color: #f9f5f0;
    --dark-background: #252525;
    --card-background: #fffdfb;
    --secondary-background: #f8f8f8;
    --border-color: #727272;
    --white: #ffffff;
    --header-height: 70px;
    --font-korean: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --max-width: 1200px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: var(--font-korean);
    line-height: 1.6;
    color: var(--text-color);
    background: var(--background-color);
    overflow-x: hidden;
    width: 100%;
    min-width: 320px;
    min-height: 100vh;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: var(--font-korean);
  }

  section {
    padding: 80px 0;
    width: 100%;
    overflow-x: hidden;
  }

  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    section {
      padding: 60px 0;
    }
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }
`;

export default GlobalStyle; 