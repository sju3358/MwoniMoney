import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
// import background from "../assest/image/background.jpg";

export default createGlobalStyle`
    ${reset}
    body{
        font-family: "Font_test"; 
        position: absolute;
        margin:0;
        padding:0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: url(${background});
        background-size: cover;
    }
`;
