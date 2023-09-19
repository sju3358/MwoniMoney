import React from "react";
import {
  AllowanveContainer,
  ChildrenList,
  Emoji,
  MainContainer,
  QrContainer,
  Text,
  TextContainer,
  TextEmojiBox,
  TextMentBox,
  WhiteBox,
} from "../components/Parents/Main";

function Main() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <ChildrenList />
      <TextContainer>
        <TextMentBox>
          <Text>현재 {childName}는</Text>
          <Text>매달 {childAllowance}원을 </Text>
          <Text>받고 있어요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </TextContainer>
      <AllowanveContainer>
        <WhiteBox />
      </AllowanveContainer>
      <AllowanveContainer>
        <WhiteBox />
      </AllowanveContainer>
      <QrContainer>
        <WhiteBox />
      </QrContainer>
    </MainContainer>
  );
}

export default Main;
