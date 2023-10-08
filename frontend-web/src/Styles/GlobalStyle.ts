import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import background from "../assests/image/backgroundv1.png";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'TheJamsil7Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'TheJamsil5Bold';
        src: url("/fonts/The Jamsil 4 Medium.ttf") format("woff2");
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'TheJamsil4Bold';
        src: url("/fonts/The Jamsil 3 Regular.ttf") format("woff2");
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'TheJamsil3Bold';
        src: url("/fonts/The Jamsil 2 Light.ttf") format("woff2");
        font-weight: 300;
        font-style: normal;
    }

    body{
        font-family: 'TheJamsil7Bold',sans-serif;
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
