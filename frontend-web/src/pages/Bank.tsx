import React from "react";
import {
  AllowanveContainer,
  ChildrenList,
  MainContainer,
  QrContainer,
  Text,
  TextContainer,
  PigBox,
  TextMentBox,
  PigContainer,
  PigBigText,
  PigSmallText,
  Emoji,
  PigRowBox,
  PigBoxBox,
  InTextContainer1,
  InTextContainer2
} from "../components/Parents/Bank";
import Allowance from "../components/Common/Allowance";
import SpacialAllowance from "../components/Common/SpacialAllowance";
import Qr from "../components/Common/Qr";

function Bank() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <TextContainer>
        <TextMentBox>
          <Text>현재 {childName}는</Text>
          <Text>{childAllowance}원의 부채가 있어요! </Text>
        </TextMentBox>
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

export default Bank;
