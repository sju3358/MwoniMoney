import React from "react";
import {
  MainContainer,
  Text,
  TextBold_SP,
  Text_GR,
  TextContainer,
  TextEmojiBox,
  TextMentBox,
  Emoji,
  BalanceContainer,
  QuizContainer,
  ChallengeContainer,
} from "../components/Children/Main";

//컴포넌트
import Balance from "../components/Children/Balance";
import Quiz from "../components/Children/Quiz/Quiz";
import Challenge from "../components/Children/Challenge";

//이미지
import Coin from "../assests/image/main/Coin.png";

function ChildrenPage() {
  const asset = "100,000원";
  const debt = "10,000원";
  return (
    <MainContainer>
      <TextContainer>
        <TextMentBox>
          <Text>현재</Text>
          <Text>
            <TextBold_SP>{asset}</TextBold_SP>을 가지고 있고
          </Text>
          <Text>
            <TextBold_SP>{debt}</TextBold_SP>의 빚을 가지고
          </Text>
          <Text>있어요!</Text>
          <Text_GR>퀴즈를 맞추거나</Text_GR>
          <Text_GR>챌린지에 도전해서 용돈을 얻어보세요!</Text_GR>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji url={`${Coin}`} width="80%" height="80%" />
        </TextEmojiBox>
      </TextContainer>
      <BalanceContainer height="40%">
        <Balance />
      </BalanceContainer>
      <QuizContainer height="30%">
        <Quiz />
      </QuizContainer>
      <ChallengeContainer height="60%">
        <Challenge />
      </ChallengeContainer>
    </MainContainer>
  );
}

export default ChildrenPage;
