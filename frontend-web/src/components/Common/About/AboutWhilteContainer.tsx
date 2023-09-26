import styled from "styled-components";

interface WhiteBoxProps {
  height?: string;
  width?: string;
  flexDirection?: string;
  backcolor?: string;
  marginB?: string;
  paddingB?: string | undefined;
}

export const WhiteBox1 = styled.div<WhiteBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#ffffff"};
  border-radius: 8px;
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  margin-top: ${(props) => (props.marginB ? props.marginB : "0%")};
  padding-top: ${(props) => props.paddingB};
`;

interface WhiteBoxProps_v1 {
  height?: string | null;
  width?: string | null;
  padding?: string | null;
  margin?: string | null;
  borderradius?: string | null;
  display?: string | null;
  justifycontent?: string | null;
  alignitems?: string | null;
  flexdirection?: string | null;
}
export const WhiteBox = styled.div<WhiteBoxProps_v1>`
  // border: 1px solid black;
  border-radius: ${(props) =>
    props.borderradius ? props.borderradius : "8px"};
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "90%")};
  background-color: #ffffff;
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ""};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
  flex-direction: ${(props) =>
    props.flexdirection ? props.flexdirection : ""};
`;
