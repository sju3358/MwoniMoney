import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import background from "../assests/image/backgroundv1.png";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'TheJamsil5Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    body{
        font-family: 'TheJamsil5Bold', sans-serif;
        position: absolute;
        margin:0;
        padding:0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${background});
        background-size: cover;
    }
`;
