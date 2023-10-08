import styled from "styled-components";
import React from "react";
import { Img, ImgBox } from "./About/AboutEmogi";
import { Text } from "./About/AboutText";
import MoneyBag from "../../assests/image/main/MoneyBag.png"; // 이미지 경로를 수정해야합니다.
import { Container } from "./About/AboutContainer";

interface HistoryProps {
  time: string;
  money: number;
}

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

const HistoryContainer = styled(Container)`
  width: 93%;
  height: 30%;
  justify-content: space-between;
  margin-top: 3%;
`;

const LeftContainer = styled(Container)`
  width: 55%;
  height: 100%;
`;

const ImageContainer = styled(ImgBox)`
  width: 50%;
  height: 100%;
  background-color: #b9deb3;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled(Container)`
  width: 23%;
`;

const MoneyText = styled(Text)`
  color: #b9deb3;
  font-size: 1rem;
  font-weight: 600;
  padding: 10% 0% 1% 0%;
`;

function History({ time, money }: HistoryProps) {
  return (
    <HistoryContainer>
      <LeftContainer>
        <ImageContainer>
          <Img src={MoneyBag} width="90%" height="90%" />
        </ImageContainer>
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
            {time}
          </Text>
        </Container>
      </LeftContainer>
      <RightContainer>
        <MoneyText>{money}원</MoneyText>
      </RightContainer>
    </HistoryContainer>
  );
}

export default History;
