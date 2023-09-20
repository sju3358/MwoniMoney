import CustomizedAccordions from "./CustomizedAccordions";
import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../../Common/WhiteBox";

//이미지
import Pencil from "../../../assests/image/main/Pencil.png";

const QuizParent = styled.div`
  //퀴즈 스타일 설정
  //가장 밖
  width: 100%;
  height: 100%;
  border: solid 1px black;
  // background-color: tomato;
`;

// 위젯 헤더
const widgetHeader = styled.div`
  border: solid 1px black;
  display: flex;
`;
export const TextContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
  padding: 5%;
`;
export const TextMentBox = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: baseline;
`;

export const TextEmojiBox = styled.div`
  // border: 1px solid red;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EmogiProps {
  url: string;
  // size: string;
  width: string;
  height: string;
}

export const Emoji = styled.div<EmogiProps>`
  // border: 1px solid red;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
`;
//퀴즈 container
const QuizContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
`;

//퀴즈 헤더
const QuizHeader = styled.div`
  border: solid 1px black;
`;
const TextBold = styled.span`
  font-size: 1.25rem;
  padding: 5%;
`;
const AnswerResult = styled.div``;

//퀴즈 문제
const QuizBody = styled.div``;

interface TextProps {
  fontcolor: string; // 'String' -> 'string'
}

const Text = styled.span<TextProps>`
  font-size: 0.625rem;
  color: ${(props) => props.fontcolor};
`;

const WhiteBox_V1 = styled(WhiteBox)`
  margin-left: 5%;
  height: 50%;
`;
/////
interface BodyProps {
  isdisplay: string; // 'String' -> 'string'
}
const Body = styled.div<BodyProps>`
  display: ${(props) => props.isdisplay};
`;
const Btn = styled.button``;

export default function Quiz() {
  const [isButton, setIsButton] = useState("none");
  const handleButtonClick = () => {
    if (isButton === "none") {
      setIsButton("flex");
    } else {
      setIsButton("none");
    }
  };
  return (
    <QuizParent>
      <TextBold>오늘의 퀴즈</TextBold>
      <TextContainer>
        <TextMentBox>
          <Text fontcolor="#747476">퀴즈를 맞추면</Text>
          <Text fontcolor="#747476">용돈을 더 받을 수 있어요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji url={`${Pencil}`} width="100%" height="100%" />
        </TextEmojiBox>
      </TextContainer>

      <WhiteBox_V1>
        <QuizHeader>
          <TextBold>Q1.</TextBold>
          <AnswerResult />
        </QuizHeader>
        <QuizBody>
          <Text fontcolor="black">
            소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를
            교묘하게 디자인하는 것을 뜻 하는 말은?
          </Text>
        </QuizBody>
        {/* <CustomizedAccordions /> */}
        <Body isdisplay={`${isButton}`}>gg</Body>
        <Btn onClick={handleButtonClick}>버튼</Btn>
      </WhiteBox_V1>
    </QuizParent>
  );
}
