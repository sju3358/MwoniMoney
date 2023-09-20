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
