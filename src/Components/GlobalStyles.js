import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    button{
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    button:disabled {
        cursor: not-allowed;
    }
    ul, li {
        list-style: none;
        padding: 0;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export default GlobalStyles;
