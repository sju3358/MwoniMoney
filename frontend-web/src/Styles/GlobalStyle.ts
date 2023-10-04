import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import background from "../assests/image/backgroundv1.png";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    @import url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    body{
        font-family: "Pretendard-Regular";
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
