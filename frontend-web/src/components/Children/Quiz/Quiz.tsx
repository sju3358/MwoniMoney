import CustomizedAccordions from "./CustomizedAccordions";
import React from "react";
import styled from "styled-components";

const QuizParent = styled.div`
  //퀴즈 스타일 설정
  //가장 밖
  width: 300px;
  height: 300px;
  border: solid 1px black;
  background-color: tomato;
`;

// 퀴즈 헤더
const QuizHeader = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px black;
`;
const Text1 = styled.span`
  font-size: 1.25rem;
`;
const AnswerResult = styled.div``;

//퀴즈 문제
const QuizBody = styled.div``;

const Text2 = styled.span`
  font-size: 0.625rem;
`;

export default function QuizCompo() {
  return (
    <QuizParent>
      <QuizHeader>
        <Text1>Q1.</Text1>
        <AnswerResult />
      </QuizHeader>
      <QuizBody>
        <Text2>
          소비자가 의도치 않게 물건을 사거나 이용료를 결제하게끔 서비스를
          교묘하게 디자인하는 것을 뜻 하는 말은?
        </Text2>
      </QuizBody>
      <CustomizedAccordions />
    </QuizParent>
  );
}
