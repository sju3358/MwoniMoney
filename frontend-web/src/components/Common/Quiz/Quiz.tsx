import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";

//이미지
import Pencil from "../../../assests/image/main/Pencil.png";
import DownArrow from "../../../assests/image/quiz/DownArrow.png";
import UpArrow from "../../../assests/image/quiz/UpArrow.png";
import O from "../../../assests/image/quiz/O.png";
import X from "../../../assests/image/quiz/X.png";
import None from "../../../assests/image/quiz/None.png";
import Correct from "../../../assests/image/quiz/Correct.png";
import Error from "../../../assests/image/quiz/Error.png";
import { EmogiBox } from "../History";

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

//퀴즈 문제

// interface TextProps {
//   fontcolor?: string | null;
//   fontfamily?: string | null;
//   fontsize?: string | null;
//   fontstyle?: string | null;
//   fontweight?: string | null;
//   margin?: string | null;
//   padding?: string | null;
// }

// const Text = styled.div<TextProps>`
//   color: ${(props) => (props.fontcolor ? props.fontcolor : "black")};
//   font-family: ${(props) => (props.fontfamily ? props.fontfamily : "Inter")};
//   font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
//   font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
//   font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
//   margin: ${(props) => (props.margin ? props.margin : "0%")};
//   padding: ${(props) => (props.padding ? props.padding : "0%")};
//   line-height: 1.2rem;
// `;

interface WhiteBox_V1_Props {
  isdisplay: string; // 'String' -> 'string'
}
const WhiteBox_V1 = styled(WhiteBox1)<WhiteBox_V1_Props>`
  boarder: 1px solid red;
  box-sizing: border-box;
  height: ${(props) => (props.isdisplay === "none" ? "80%" : "90%")};
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
  font-size: 0.85rem;
  padding-right: 2%;
`;

const ExampleText = styled.div`
  border: 1px solid red;
  width: 100%;
  font-size: 0.85rem;
`;
const ExampleBtn = styled.button`
  border: 0;
  width: 100%;
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
  width: 100%;
  height: 100%;
  padding: 2%;
  align-items: center;
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
  const width = 15;

  return (
    <Container
      height="100%"
      flexDirection="column"
      marginT="5%"
      overflowy="hidden"
    >
      {/* 퀴즈 타이트 10% */}
      <Container height="10%">
        <TextBox height="100%">오늘의 퀴즈</TextBox>
      </Container>
      {/* 퀴즈 설명 20% */}
      <Container height="20%">
        <Container width="80%" height="100%" flexDirection="column">
          <TextBox fontSize="0.8em" marginL="25%">
            퀴즈를 맞추면
          </TextBox>
          <TextBox fontSize="0.8em" marginL="25%">
            용돈을 더 받을 수 있어요!
          </TextBox>
        </Container>

        <Container width="20%" height="100%">
          <EmogiBox backImg={`${Pencil}`} width="100%" height="100%" />
        </Container>
      </Container>
      {/* 퀴즈 화이트 박스 70% */}
      <Container height="70%">
        <WhiteBox_V1
          height="70%"
          flexDirection="column"
          isdisplay={`${isButton}`}
        >
          {/* 퀴즈/ 화이트박스-타이틀 20% */}
          <Container height="20%">
            <TextBox height="100%" width="15%">
              Q1.
            </TextBox>
            <Container height="100%" width="85%" overflowy="hidden">
              <Container height="100%" width="55%" />
              <Container
                height="100%"
                width="40%"
                justifyContent="space-between"
              >
                <EmogiBox
                  backImg={`${None}`}
                  width={`${width}%`}
                  height={`${width + 10}%`}
                />
                <EmogiBox
                  backImg={`${None}`}
                  width={`${width}%`}
                  height={`${width + 10}%`}
                />
                <EmogiBox
                  backImg={`${None}`}
                  width={`${width}%`}
                  height={`${width + 10}%`}
                />
                <EmogiBox
                  backImg={`${None}`}
                  width={`${width}%`}
                  height={`${width + 10}%`}
                />
                <EmogiBox
                  backImg={`${None}`}
                  width={`${width}%`}
                  height={`${width + 10}%`}
                />
              </Container>
              <Container height="100%" width="5%" />
            </Container>
          </Container>
          {/* 퀴즈/ 화이트박스-내용 80% */}
          <Container height="80%" flexDirection="column">
            <Container height="80%" overflowy="hidden">
              <TextBox
                height="100%"
                fontSize="1em"
                marginL="0%"
                fontWeight="normal"
                style={{ margin: "3%" }}
              >
                소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를
                교묘하게 디자인하는 것을 뜻 하는 말은?
              </TextBox>
            </Container>

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
            <Container height="19%">
              <Btn onClick={handleButtonClick}>
                {isButton === "none" ? (
                  <Img height="100%" width="100%" src={`${DownArrow}`} />
                ) : (
                  <Img height="100%" width="100%" src={`${UpArrow}`} />
                )}
              </Btn>
            </Container>
          </Container>
        </WhiteBox_V1>
      </Container>
    </Container>
  );
}
