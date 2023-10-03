import React from "react";
import styled from "styled-components";
import Newspaper from "../../../assests/image/main/Newspaper.png";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import News from "../../../modal/Quiz/News";
import { TextBox } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";
import axios, { AxiosResponse } from "axios";
import api from "../../../apis/Api";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { Routes, Route } from "react-router-dom"; // Routes와 Route 추가

interface ImgProps {
  width?: string | null;
  height?: string | null;
  padding?: string | null;
  margin?: string | null;
}

export const Img_no = styled.img<ImgProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
`;

interface ButtonProps {
  backgroundcolor: string;
  border: string;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundcolor};
  border: ${(props) => props.border};
  border-radius: 5px;
  margin: 2% 5% 0% 5%;
  padding: 2% 7% 2% 7%;
  font-weight: bold;
  font-size: 1em;
`;

const Click = styled.div`
  width: 20%;
  height: 17%;
  background-color: #ffa27e;
  border: 0;
  border-radius: 50px;
  position: relative;
  bottom: 15%;
  left: 20%;
  display: flex;
  justify-content: center;
`;

interface BalanceCompoProps {
  showText?: boolean;
  showImg?: boolean;
  questionText: string;
  buyText: string;
  notBuyText: string;
  news: string;
  countOfLeftAnswer?: number;
  countOfRightAnswer?: number;
  balanceIdx: number; // Add balanceIdx prop
}

const patchAnswer = (
  balanceIdx: number,
  selectAnswer: string
): Promise<AxiosResponse> => {
  return api.patch(`/v1/balances/${balanceIdx}/answer`, {
    selectAnswer: selectAnswer, // Pass selectAnswer in the request body
  });
};

function BalanceCompo({
  showText = true,
  showImg = true,
  questionText,
  buyText,
  notBuyText,
  news,
  balanceIdx,
}: BalanceCompoProps) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = (selectAnswer: string) => {
    patchAnswer(balanceIdx, selectAnswer); // Call patchAnswer with balanceIdx and selectAnswer
    window.alert("답변이 선택되었습니다!"); // Show an alert message
  };

  const navigateClick = () => {
    navigate("/balance"); // 클릭 시 '/balance'로 이동
  };

  return (
    <Container height="100%" flexDirection="column">
      <Container height="10%" overflowy="hidden">
        {showText && <TextBox height="100%">오늘의 밸런스 게임</TextBox>}
      </Container>
      <WhiteBox1 height="75%" marginB="5%" flexDirection="column">
        <Container height="10%" justifyContent="end">
          {showImg ? (
            <EmogiBox
              backImg={`${LeftArrow}`}
              width="7%"
              height="100%"
              onClick={navigateClick}
            />
          ) : null}
        </Container>
        <Container height="53%" flexDirection="column">
          <EmogiBox backImg={`${Newspaper}`} width="45%" height="100%" />
          <Click>
            <News news={news} />
          </Click>
        </Container>
        <Container height="15%">
          <TextBox
            fontSize="1rem"
            height="100%"
            marginL="0%"
            justifyContent="center"
          >
            {questionText}
          </TextBox>
        </Container>
        <Container height="20%">
          <Button
            backgroundcolor="#FBD56E"
            border="0"
            onClick={() => handleClick("LEFT")} // Call handleClick with "LEFT"
          >
            {buyText}
          </Button>
          <Button
            backgroundcolor="F4F4F4"
            border="0"
            onClick={() => handleClick("RIGHT")} // Call handleClick with "RIGHT"
          >
            {notBuyText}
          </Button>
        </Container>
      </WhiteBox1>
    </Container>
  );
}

export default BalanceCompo;
