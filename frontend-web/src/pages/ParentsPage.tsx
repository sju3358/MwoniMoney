import React from "react";
import {
  Emoji,
  MainContainer,
  Text,
  TextEmojiBox,
} from "../components/Common/Main/MainStyle";
import Allowance from "../components/Common/Main/Allowance";
import SpacialAllowance from "../components/Common/Main/SpacialAllowance";
import Qr from "../components/Common/Main/Qr";
import Money from "../assests/image/Money.png";
import { Container } from "../components/Common/About/AboutContainer";
import { ChildCard, AddChild } from "../components/Common/Main/ChildCard";
import GoalForMain from "../components/Common/GoalMoney/GoalMoneyForMain";
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";

function ParentsPage() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  const [userData, setUserData] = useRecoilState(userDataState);
  // if(userData.memberRole == "G")
  // alert(userData.memberRole);
  return (
    <MainContainer>
      <Container height="15%">
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
      </Container>

      <Container height="25%">
        <Container
          height="100%"
          width="80%"
          flexDirection="column"
          align="start"
        >
          <Text>현재 {childName}는</Text>
          <Text>매달 {childAllowance}원을 </Text>
          <Text>받고 있어요!</Text>
        </Container>
        <TextEmojiBox>
          <Emoji url={`${Money}`} width="80%" height="50%" />
        </TextEmojiBox>
      </Container>
      <Container height="60%">
        <Allowance />
      </Container>
      <Container height="50%">
        <SpacialAllowance />
      </Container>
      <Container height="50%">
        <GoalForMain />
      </Container>
      <Container height="30%">
        <Qr />
      </Container>
    </MainContainer>
  );
}

export default ParentsPage;
