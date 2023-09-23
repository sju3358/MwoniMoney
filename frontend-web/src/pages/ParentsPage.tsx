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
} from "../components/Common/Main/MainStyle";
import Allowance from "../components/Common/Main/Allowance";
import SpacialAllowance from "../components/Common/Main/SpacialAllowance";
import Qr from "../components/Common/Main/Qr";
import Money from "../assests/image/Money.png";

import { Container } from "../components/Common/About/AboutContainer";
import { ChildCard, AddChild } from "../components/Common/Main/ChildCard";

function ParentsPage() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <ChildrenList>
        <Container width="33%" height="100%">
          <ChildCard />
        </Container>
        <Container width="33%" height="100%">
          <ChildCard />
        </Container>
        <Container width="33%" height="100%">
          <ChildCard />
        </Container>
        <Container width="33%" height="100%">
          <AddChild />
        </Container>
      </ChildrenList>
      <TextContainer>
        <TextMentBox>
          <Text>현재 {childName}는</Text>
          <Text>매달 {childAllowance}원을 </Text>
          <Text>받고 있어요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji
            // url={process.env.PUBLIC_URL + "/images/Money.png"}
            url={`${Money}`}
            width="80%"
            height="80%"
          />
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

export default ParentsPage;
