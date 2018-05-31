import css from 'styled-jsx/css'

export const bodyStyle = css`
  html * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
  }

  main {
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: auto;
    overflow: hidden;
    font-size: 1.8rem;
  }

  section.left {
    width: 40%;
  }

  section.right {
    width: 60%;
  }

  label { display: block; }
`
