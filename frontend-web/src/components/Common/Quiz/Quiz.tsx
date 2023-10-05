import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import Pencil from "../../../assests/image/main/Pencil.png";
import DownArrow from "../../../assests/image/quiz/DownArrow.png";
import UpArrow from "../../../assests/image/quiz/UpArrow.png";
import O from "../../../assests/image/quiz/O.png";
import X from "../../../assests/image/quiz/X.png";
import None from "../../../assests/image/quiz/None.png";
import Correct from "../../../assests/image/quiz/Correct.png";
import Error from "../../../assests/image/quiz/Error.png";
import { EmogiBox } from "../History";
import axios, { AxiosResponse } from "axios";
import api from "../../../apis/Api";

export const TextContainer = styled.div`
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
  padding: 0% 0% 0% 5%;
`;

export const TextMentBox = styled.div`
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextEmojiBox = styled.div`
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EmogiProps {
  url: string;
  width: string;
  height: string;
}

export const Emoji = styled.div<EmogiProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
`;

interface WhiteBox_V1_Props {
  isdisplay: string;
}

const WhiteBox_V1 = styled(WhiteBox1)<WhiteBox_V1_Props>`
  boarder: 1px solid red;
  box-sizing: border-box;
  height: ${(props) => (props.isdisplay === "none" ? "80%" : "90%")};
  margin-bottom: 5%;
`;

interface BodyProps {
  isdisplay: string;
}

const Body = styled.div<BodyProps>`
  display: ${(props) => props.isdisplay};
`;

const Btn = styled.button`
  // border: 1px solid gold;
  border: 0;
  background-color: transparent;
  display: flex;
`;

const ExampleContainer = styled.div`
  border: 1px solid blue;
  width: 100%;
`;

const ExampleBox = styled.div`
  border: 1px solid red;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const ExampleNumber = styled.span`
  font-size: 0.85rem;
  padding-right: 2%;
`;

const ExampleText = styled.div`
  // border: 1px solid red;
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

const getQuizes = (): Promise<AxiosResponse> => {
  return api.get(`/v1/quizes`, {});
};

export default function Quiz() {
  const [isButton, setIsButton] = useState("none");
  const [quiztype, setQuizType] = useState(0);
  const [quizes, setQuizes] = useState<any[]>([]); // 타입을 any[]로 지정

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await getQuizes();
        setQuizes(response.data);
      } catch (error) {
        console.error("Error fetching quizes:", error);
      }
    };

    fetchQuizes();
  }, []);

  const handleButtonClick = () => {
    if (isButton === "none") {
      setIsButton("flex");
    } else {
      setIsButton("none");
    }
  };

  const width = "15%";

  return (
    <Container height="100%" flexDirection="column" marginT="5%">
      <Container height="10%" overflowy="hidden">
        <TextBox height="100%">오늘의 퀴즈</TextBox>
      </Container>
      <Container height="20%">
        <Container width="75%" height="100%" flexDirection="column">
          <TextBox fontSize="0.8em" marginL="25%">
            퀴즈를 맞추면
          </TextBox>
          <TextBox fontSize="0.8em" marginL="25%">
            용돈을 더 받을 수 있어요!
          </TextBox>
        </Container>

        <Container width="25%" height="100%">
          <EmogiBox backImg={`${Pencil}`} width="90%" height="100%" />
        </Container>
      </Container>
      <Container height="70%">
        <WhiteBox_V1
          height="70%"
          flexDirection="column"
          isdisplay={`${isButton}`}
        >
          {/* 문제 번호 담는 Container */}
          <Container height="20%" justifyContent="start">
            <TextBox height="100%" width="15%">
              Q1.
            </TextBox>
          </Container>

          {/* 문제 내용을 담는 Container */}
          <Container height="80%" flexDirection="column">
            <Container height="80%" overflowy="hidden">
              <TextBox
                height="100%"
                fontSize="1em"
                marginL="0%"
                fontWeight="normal"
                style={{ margin: "3%" }}
              >
                {quizes.length > 0 ? quizes[0].question : ""}
              </TextBox>
            </Container>
            <Body isdisplay={`${isButton}`}>
              <ExampleContainer>
                {quiztype === 0 ? (
                  <ExampleBox>
                    {quizes.map((quizItem, index) => (
                      <ExampleBtn key={index}>
                        <ExampleText>
                          <ExampleNumber>{index + 1}</ExampleNumber>
                          {quizItem.option1}
                        </ExampleText>
                      </ExampleBtn>
                    ))}
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
