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
} from "../components/Parents/Main";
import Allowance from "../components/Common/Allowance";
import SpacialAllowance from "../components/Common/SpacialAllowance";
import { WhiteBox } from "../components/Common/WhiteBox";
import Qr from "../components/Common/Qr";

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
      <AllowanveContainer height="60%">
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
