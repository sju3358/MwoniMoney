import CustomizedAccordions from "./CustomizedAccordions";
import React from "react";
import styled from "styled-components";

const QuizParent = styled.div`
  //퀴즈 스타일 설정
  //가장 밖
  width: 100%;
  height: 100%;
  border: solid 1px black;
  background-color: tomato;
`;

// 퀴즈 헤더
const QuizHeader = styled.div`
  border: solid 1px black;
`;
const TextBold = styled.span`
  font-size: 1.25rem;
`;
const AnswerResult = styled.div``;

//퀴즈 문제
const QuizBody = styled.div``;

interface TextProps {
  fontColor: string; // 'String' -> 'string'
}

const Text = styled.span<TextProps>`
  font-size: 0.625rem;
  color: ${(props) => props.fontColor};
`;

export default function Quiz() {
  return (
    <QuizParent>
      <TextBold>오늘의 퀴즈</TextBold>
      <Text fontColor="#747476">퀴즈를 맞추면</Text>
      <Text fontColor="#747476">용돈을 더 받을 수 있어요!</Text>
      <QuizHeader>
        <TextBold>Q1.</TextBold>
        <AnswerResult />
      </QuizHeader>
      <QuizBody>
        <Text fontColor="black">
          소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를
          교묘하게 디자인하는 것을 뜻 하는 말은?
        </Text>
      </QuizBody>
      <CustomizedAccordions />
    </QuizParent>
  );
}
