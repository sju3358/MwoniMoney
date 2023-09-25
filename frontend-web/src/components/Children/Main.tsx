import { Quiz } from "@mui/icons-material";
import React from "react";
import BalanceCompo from "../Common/Balance/BalanceCompo";
import {
  MainContainer,
  TextContainer,
  TextMentBox,
  TextEmojiBox,
  Emoji,
  BalanceContainer,
  QuizContainer,
  ChallengeContainer,
  Text,
} from "../Common/Main/Main";
import Challenge from "./Challenge";
import Coin from "../assests/image/main/Coin.png";

function ChildrenPage() {
  const asset = "100,000원";
  const debt = "10,000원";
  return (
    <MainContainer>
      <TextContainer>
        <TextMentBox>
          <Text margin="0% 0% 0% 5%" padding="0% 0% 5% 0%">
            현재
          </Text>
          <Text margin="0% 0% 0% 5%" padding="0% 0% 5% 0%">
            <Text as="span" fontweight="700">
              {asset}
            </Text>
            을 가지고 있고
          </Text>
          <Text margin="0% 0% 0% 5%" padding="0% 0% 5% 0%">
            <Text as="span" fontweight="700">
              {debt}
            </Text>
            의 빚을 가지고
          </Text>
          <Text margin="0% 0% 0% 5%" padding="0% 0% 5% 0%">
            있어요!
          </Text>

          <Text
            color="#747476"
            fontsize="0.625rem"
            margin="0% 0% 0% 5%"
            padding="0% 0% 3% 0%"
          >
            퀴즈를 맞추거나
          </Text>
          <Text
            color="#747476"
            fontsize="0.625rem"
            margin="0% 0% 0% 5%"
            padding="0% 0% 3% 0%"
          >
            챌린지에 도전해서 용돈을 얻어보세요!
          </Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji url={`${Coin}`} width="80%" height="80%" />
        </TextEmojiBox>
      </TextContainer>
      <BalanceContainer height="50%">
        <BalanceCompo />
      </BalanceContainer>
      <QuizContainer height="auto">
        <Quiz />
      </QuizContainer>
      <ChallengeContainer height="60%">
        <Challenge />
      </ChallengeContainer>
    </MainContainer>
  );
}

export default ChildrenPage;
