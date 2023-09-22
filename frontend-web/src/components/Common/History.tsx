import styled from "styled-components";
import React from "react";
import { Img, ImgBox } from "./About/AboutEmogi";
import { Text } from "./About/AboutText";
import MoneyBag from "../../assests/image/main/MoneyBag.png";

interface EmogiBoxProps {
  width?: string;
  height?: string;
  backImg?: string;
}

export const EmogiBox = styled.div<EmogiBoxProps>`
  // border: 1px solid red;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  background-image: url(${(props) => props.backImg});
  background-size: 100% 100%;
`;

interface ContainerProps {
  flexdirection?: string | null;
  width?: string | null;
  height?: string | null;
  justifycontent?: string | null;
  padding?: string | null;
}
const Container = styled.div<ContainerProps>`
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};
  display: flex;
  flex-direction: ${(props) =>
    props.flexdirection ? props.flexdirection : ""};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ""};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
`;

function History() {
  return (
    <Container
      width="90%"
      height="15%"
      justifycontent="space-between"
      padding="5% 5% 0% 5%"
    >
      <Container width="50%">
        <ImgBox
          width="50%"
          height="100%"
          backgroundcolor="#B9DEB3"
          borderradius="50px"
          justifycontent="center"
          alignitems="center"
        >
          <Img src={`${MoneyBag}`} width="90%" height="90%" />
        </ImgBox>
        <Container
          width="90%"
          flexdirection="column"
          padding="0% 0% 0% 5%"
          justifycontent="center"
        >
          <Text fontsize="0.9375rem" fontweight="700" padding="0% 0% 10% 0%">
            정기용돈
          </Text>
          <Text color="#969696" fontsize="0.625rem" fontweight="700">
            11.28 오전 10.25
          </Text>
        </Container>
      </Container>
      <Container>
        <Text
          color="#B9DEB3"
          fontsize="0.9375rem"
          fontweight="700"
          padding="10% 0% 0% 0%"
        >
          10,000원
        </Text>
      </Container>
    </Container>
  );
}

export default History;
