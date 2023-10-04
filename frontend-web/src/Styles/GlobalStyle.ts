import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import background from "../assests/image/backgroundv1.png";

export const GlobalStyles = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: 'Pretendard-Regular';
        // src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css')
        font-weight: 400;
        font-style: normal;
    }

    body{
        font-family: 'Pretendard-Regular', sans-serif;
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
