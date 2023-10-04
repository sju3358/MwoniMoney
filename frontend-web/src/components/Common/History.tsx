import styled from "styled-components";
import React from "react";
import { Img, ImgBox } from "./About/AboutEmogi";
import { Text } from "./About/AboutText";
import MoneyBag from "../../assests/image/main/MoneyBag.png";
import { Container } from "./About/AboutContainer";

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

function History() {
  return (
    <Container
      width="93%"
      height="30%"
      justifyContent="space-between"
      marginT="3%"
    >
      <Container width="55%" height="100%">
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
          flexDirection="column"
          height="100%"
          align="start"
        >
          <Text fontsize="0.9375rem" fontweight="700" padding="0% 0% 10% 0%">
            정기용돈
          </Text>
          <Text color="#969696" fontsize="0.625rem" fontweight="700">
            11.28 오전 10.25
          </Text>
        </Container>
      </Container>
      <Container width="23%">
        <Text
          color="#B9DEB3"
          fontsize="1rem"
          fontweight="600"
          padding="10% 0% 1% 0%"
        >
          10,000원
        </Text>
      </Container>
    </Container>
  );
}

export default History;
