import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import Pencil from "../../../assests/image/main/Pencil.png";
import api from "../../../apis/Api";
import { EmogiBox } from "../History";

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

const ExampleNumber = styled.span`
  font-size: 0.85rem;
  padding-right: 2%;
`;

const ExampleText = styled.div`
  width: 100%;
  font-size: 0.85rem;
`;

const ExampleBtn = styled.button`
  border: 0;
  width: 100%;
  background-color: transparent;
`;

const getQuizes = (): Promise<any> => {
  return api.get(`/v1/quizes`, {});
};

export default function Quiz() {
  const [isButton] = useState("none");
  const [quizes, setQuizes] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const handleOptionClick = async (optionIndex: number) => {
    if (currentQuestionIndex < quizes.length) {
      const quizIdx = quizes[currentQuestionIndex].id;
      const answer = optionIndex + 1;
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.post(
          "https://j9b310.p.ssafy.io/api/v1/quizes",
          {
            quizIdx,
            answer,
          },
          { headers }
        );

        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    }
  };

  return (
    <Container height="100%" flexDirection="column" marginT="5%">
      <Container height="10%" overflowy="hidden">
        <TextBox fontF="TheJamsil7Bold" height="100%">
          오늘의 퀴즈
        </TextBox>
      </Container>
      <Container height="20%">
        <Container width="75%" height="100%" flexDirection="column">
          <TextBox fontSize="1.1em" marginL="25%">
            퀴즈를 맞추면
          </TextBox>
          <TextBox fontSize="1.1em" marginL="25%">
            용돈을 더 받을 수 있어요!
          </TextBox>
        </Container>
        <Container width="25%" height="100%">
          <EmogiBox backImg={`${Pencil}`} width="90%" height="100%" />
        </Container>
      </Container>
      <Container height="70%">
        <WhiteBox_V1
          height="90%"
          flexDirection="column"
          isdisplay={`${isButton}`}
        >
          {currentQuestionIndex < quizes.length && (
            <div>
              <TextBox
                height="40%"
                width="90%"
                fontSize="1em"
                marginL="0%"
                fontWeight="normal"
                style={{ margin: "5%", textAlign: "left" }}
              >
                {quizes[currentQuestionIndex].question}
              </TextBox>
              <ExampleBtn onClick={() => handleOptionClick(0)}>
                <ExampleText>
                  <ExampleNumber>1</ExampleNumber>
                  {quizes[currentQuestionIndex].option1}
                </ExampleText>
              </ExampleBtn>
              <ExampleBtn onClick={() => handleOptionClick(1)}>
                <ExampleText>
                  <ExampleNumber>2</ExampleNumber>
                  {quizes[currentQuestionIndex].option2}
                </ExampleText>
              </ExampleBtn>
              <ExampleBtn onClick={() => handleOptionClick(2)}>
                <ExampleText>
                  <ExampleNumber>3</ExampleNumber>
                  {quizes[currentQuestionIndex].option3}
                </ExampleText>
              </ExampleBtn>
              <ExampleBtn onClick={() => handleOptionClick(3)}>
                <ExampleText>
                  <ExampleNumber>4</ExampleNumber>
                  {quizes[currentQuestionIndex].option4}
                </ExampleText>
              </ExampleBtn>
            </div>
          )}
        </WhiteBox_V1>
      </Container>
    </Container>
  );
}
