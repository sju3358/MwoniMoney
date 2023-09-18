import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import background from "../assests/image/backgroundv1.png";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body{
        // font-family: "Font_test"; 
        position: absolute;
        margin:0;
        padding:0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-Image: url(${background});
        background-size: cover;
    }
`;
