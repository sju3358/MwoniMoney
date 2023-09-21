import styled from "styled-components";

interface WhiteBoxProps {
  height?: string;
  width?: string;
  flexDirection?: string;
  backColor?: string;
  marginB?: string;
}

export const WhiteBox1 = styled.div<WhiteBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.backColor ? props.backColor : "#ffffff"};
  border-radius: 8px;
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  margin-top: ${(props) => (props.marginB ? props.marginB : "0%")};
`;

interface WhiteBoxProps_v1 {
  height?: string | null;
  width?: string | null;
  padding?: string | null;
  margin?: string | null;
}
export const WhiteBox = styled.div<WhiteBoxProps_v1>`
  // border: 1px solid black;
  border-radius: 8px;
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "90%")};
  background-color: #ffffff;
  padding: ${(props) => (props.padding ? props.padding : "5% 0% 0% 0%")};
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0%")};
`;
