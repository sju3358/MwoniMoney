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
import axios, { AxiosResponse } from "axios";
import { api } from "../apis/Api";

const postRegister = (): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/children", {});
};

function ParentsPage() {
  console.log("asdf");
  postRegister()
    .then((response) => {
      // postRegisterChild의 응답을 처리합니다.
      console.log("postRegisterChild 응답 데이터:", response.data);
    })
    .catch((childError) => {
      console.error("postRegisterChild 오류:", childError);
    });

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
