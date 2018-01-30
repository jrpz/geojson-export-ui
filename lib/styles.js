import css from 'styled-jsx/css'

export const bodyStyle = css`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    font-size: 10px;
  }

  main {
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: auto;
    overflow: hidden;
    font-size: 1.6rem;
  }

  section {
    width: 50%;
  }

  label { display: block; }
`

export const formStyles = css`
  .formContainer {
    height: 100%;
    background-color: #174291;
    color: #fafafa;
    padding: 2rem;
  }

  .formContainer__title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .formContainer__locations {
    font-size: 1.4rem;
  }

  .formContainer__locations div {
    margin: 0.5rem auto;
  }
`

export const addLocationStyle = css`
  .addLocation {
    padding: 1.5rem 0;
  }
`
