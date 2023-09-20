import React from "react";
import {
  AllowanveContainer,
  Emoji,
  MainContainer,
  QrContainer,
  Text,
  TextContainer,
  TextEmojiBox,
  TextMentBox,
} from "../components/Parents/MyPage";
import Allowance from "../components/Common/Allowance";
import SpacialAllowance from "../components/Common/SpacialAllowance";
import Qr from "../components/Common/Qr";

function Main() {
  const name = "이지현"; // api연결시 자녀1 이름으로 매핑
  return (
    <MainContainer>
      <TextContainer>
        <TextMentBox>
          <Text>{name}님</Text>
          <Text>안녕하세요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </TextContainer>
      <AllowanveContainer height="80%">
        <Allowance />
      </AllowanveContainer>
      <AllowanveContainer height="50%">
        <SpacialAllowance />
      </AllowanveContainer>
      <QrContainer>
        <Qr />
      </QrContainer>
    </MainContainer>
  );
}

export default Main;
