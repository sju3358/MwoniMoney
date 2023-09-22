import CustomizedAccordions from "./CustomizedAccordions";
import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";

//이미지
import Pencil from "../../../assests/image/main/Pencil.png";
import DownArrow from "../../../assests/image/quiz/DownArrow.png";
import UpArrow from "../../../assests/image/quiz/UpArrow.png";
import O from "../../../assests/image/quiz/O.png";
import X from "../../../assests/image/quiz/X.png";
import None from "../../../assests/image/quiz/None.png";
import Correct from "../../../assests/image/quiz/Correct.png";
import Error from "../../../assests/image/quiz/Error.png";

const QuizParent = styled.div`
  // border: solid 1px black;
  width: 100%;
  height: 100%;
  // background-color: tomato;
`;

// 위젯 헤더
export const TextContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
  padding: 0% 0% 0% 5%;
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
  // border: solid 1px black;
  display: flex;
`;

const TextBold = styled.span`
  font-size: 1.25rem;
  padding: 5%;
`;
const AnswerResult = styled.div`
  padding-left: 5%;
`;

//퀴즈 문제
const QuizBody = styled.div``;

interface TextProps {
  fontcolor?: string | null;
  fontfamily?: string | null;
  fontsize?: string | null;
  fontstyle?: string | null;
  fontweight?: string | null;
  margin?: string | null;
  padding?: string | null;
}

const Text = styled.div<TextProps>`
  color: ${(props) => (props.fontcolor ? props.fontcolor : "black")};
  font-family: ${(props) => (props.fontfamily ? props.fontfamily : "Inter")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  line-height: 1.2rem;
`;

interface WhiteBox_V1_Props {
  isdisplay: string; // 'String' -> 'string'
}
const WhiteBox_V1 = styled(WhiteBox)<WhiteBox_V1_Props>`
  margin-left: 5%;
  height: ${(props) => (props.isdisplay === "none" ? "50%" : "90%")};
  margin-bottom: 5%;
`;
/////
interface BodyProps {
  isdisplay: string; // 'String' -> 'string'
}
const Body = styled.div<BodyProps>`
  display: ${(props) => props.isdisplay};
`;

//버튼
const Btn = styled.button`
  border: 0;
  background-color: transparent;
  padding-left: 45%;
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
`;

const ExampleContainer = styled.div`
  width: 100%;
`;
const ExampleBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ExampleNumber = styled.span`
  font-size: 0.75rem;
  padding-right: 2%;
`;

const ExampleText = styled.div`
  font-size: 0.75rem;
`;
const ExampleBtn = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    background-color: #fbd56e;
  }
`;

//img (화살표, O,x답)
interface ImgProps {
  width: string;
  height: string;
}
const Img = styled.img<ImgProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 1%;
`;
const ImgBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default function Quiz() {
  const [isButton, setIsButton] = useState("none");
  const handleButtonClick = () => {
    if (isButton === "none") {
      setIsButton("flex");
    } else {
      setIsButton("none");
    }
  };
  const quiztype: number = 0; //4지선다 : 0, 2지선다 : 1

  const dummydata = [
    {
      id: 1,
      title:
        " 소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를 교묘하게 디자인하는 것을 뜻 하는 말은?",
      ex1: "그린백",
      ex2: "다크패턴",
      ex3: "레몬마켓",
      ex4: "화이트리스트",
      ans: 1,
      type: 0,
    },
    {
      id: 2,
      title: " 문제2",
      ex1: "O",
      ex2: "X",
      ex3: null,
      ex4: null,
      ans: "O",
      type: 1,
    },
    {
      id: 3,
      title: "문제3",
      ex1: "보기1",
      ex2: "보기2",
      ex3: "답",
      ex4: "보기4",
      ans: 3,
      type: 0,
    },
    {
      id: 4,
      title: "문제4",
      ex1: "보기1",
      ex2: "보기2",
      ex3: "보기3",
      ex4: "답",
      ans: 3,
      type: 0,
    },
    {
      id: 5,
      title: " 문제5",
      ex1: "보기1",
      ex2: "답",
      ex3: "보기3",
      ex4: "보기4",
      ans: 2,
      type: 0,
    },
  ];
  // count가 1개씩 올라가면, setQuiz를 바꾼다.
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState("");

  return (
    <QuizParent>
      <Text
        fontsize="1.25rem"
        padding="5% 0% 3% 5%"
        fontcolor="black"
        fontweight="700"
      >
        오늘의 퀴즈
      </Text>
      <TextContainer>
        <TextMentBox>
          <Text fontsize="0.625rem" padding="2% 0% 0% 0%" fontcolor="#747476">
            퀴즈를 맞추면
          </Text>
          <Text fontsize="0.625rem" padding="1% 0% 0% 0%" fontcolor="#747476">
            용돈을 더 받을 수 있어요!
          </Text>
        </TextMentBox>
        <TextEmojiBox>
          <Img src={`${Pencil}`} width="100%" height="100%" />
        </TextEmojiBox>
      </TextContainer>

      <WhiteBox_V1 isdisplay={`${isButton}`}>
        <QuizHeader>
          <TextBold>Q1.</TextBold>
          <AnswerResult>
            <Img src={`${None}`} width="20%" height="20%" />
            <Img src={`${None}`} width="20%" height="20%" />
            <Img src={`${None}`} width="20%" height="20%" />
            <Img src={`${None}`} width="20%" height="20%" />
            <Img src={`${None}`} width="20%" height="20%" />
          </AnswerResult>
        </QuizHeader>
        <QuizBody>
          <Text fontsize="0.625rem" padding="5% 5% 0% 5%" fontcolor="black">
            소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를
            교묘하게 디자인하는 것을 뜻 하는 말은?
          </Text>
          <Body isdisplay={`${isButton}`}>
            <ExampleContainer>
              {quiztype === 0 ? (
                <ExampleBox>
                  <ExampleBtn>
                    <ExampleText>
                      <ExampleNumber>1</ExampleNumber>그린백
                    </ExampleText>
                  </ExampleBtn>
                  <ExampleBtn>
                    <ExampleText>
                      <ExampleNumber>2</ExampleNumber>다크패턴
                    </ExampleText>
                  </ExampleBtn>
                  <ExampleBtn>
                    <ExampleText>
                      <ExampleNumber>3</ExampleNumber>레몬마켓
                    </ExampleText>
                  </ExampleBtn>
                  <ExampleBtn>
                    <ExampleText>
                      <ExampleNumber>4</ExampleNumber>화이트리스트
                    </ExampleText>
                  </ExampleBtn>
                </ExampleBox>
              ) : (
                <>
                  <ImgBox>
                    <Img src={`${O}`} width="10%" height="10%" />
                    <Img src={`${X}`} width="10%" height="10%" />
                  </ImgBox>
                </>
              )}
            </ExampleContainer>
          </Body>
          <Btn onClick={handleButtonClick}>
            {isButton === "none" ? (
              <Img height="100%" width="100%" src={`${DownArrow}`} />
            ) : (
              <Img height="100%" width="100%" src={`${UpArrow}`} />
            )}
          </Btn>
        </QuizBody>
      </WhiteBox_V1>
    </QuizParent>
  );
}
