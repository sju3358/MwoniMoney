import React from "react";
import styled from "styled-components";
import Newspaper from "../../../assests/image/main/Newspaper.png";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import News from "../../../modal/Quiz/News";
import { TextBox } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";
import { AxiosResponse } from "axios";
import api from "../../../apis/Api";
import Button from "../About/AboutButton";
import { useNavigate } from "react-router-dom";

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
  &:active {
    background-color: #f3654a;
    transform: translate(0em, 0.2em);
  }
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
  balanceIdx: number;
}

const patchAnswer = (
  balanceIdx: number,
  selectAnswer: string
): Promise<AxiosResponse> => {
  return api.patch(`/v1/balances/${balanceIdx}/answer`, {
    selectAnswer: selectAnswer,
  });
};

function BalanceCompo({
  showText = true,
  questionText,
  buyText,
  notBuyText,
  news,
  balanceIdx,
}: BalanceCompoProps) {
  const navigate = useNavigate();

  const handleClick = (selectAnswer: string) => {
    patchAnswer(balanceIdx, selectAnswer);
    window.alert("답변이 선택되었습니다!!");
  };

  const navigateClick = () => {
    navigate("/balance");
  };

  return (
    <Container height="100%" flexDirection="column">
      {showText && (
        <Container height="10%" overflowy="hidden">
          <TextBox fontF="TheJamsil7Bold" height="100%">
            오늘의 밸런스 게임
          </TextBox>
        </Container>
      )}

      <WhiteBox1
        height={showText ? "75%" : "85%"}
        marginB="5%"
        flexDirection="column"
        onClick={navigateClick}
      >
        <Container height="10%" justifyContent="end" />
        <Container height="53%" flexDirection="column">
          <EmogiBox backImg={`${Newspaper}`} width="50%" height="100%" />
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
            margin="2% 5% 0% 5%"
            padding="2% 7% 2% 7%"
            fontS="1em"
            backcolor="#FBD56E"
            afbackcolor="#FFC107"
            borderR="20px"
            onClick={() => handleClick("LEFT")} // Call handleClick with "LEFT"
          >
            {buyText}
          </Button>
          <Button
            margin="2% 5% 0% 5%"
            padding="2% 7% 2% 7%"
            fontS="1em"
            backcolor="white"
            afbackcolor="#BBBBBB"
            borderR="20px"
            border="1px solid #BBBBBB"
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
