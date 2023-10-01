import React, { useEffect, useState } from "react";
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

const postRegisterChild = (): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/children", {});
};

const getChild = (childUuid: string): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get(`/v1/children/${childUuid}`, {});
};

function ParentsPage() {
  const [childData, setChildData] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null); // 선택한 자식 데이터를 저장하는 상태 추가
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    console.log("postRegisterChild");
    postRegisterChild()
      .then((response) => {
        setChildData(response.data);
      })
      .catch((childError) => {
        console.error(" 오류:", childError);
      });
  }, []);

  // 항상 4개의 ChildCard 컴포넌트를 유지
  const childCards = Array.from({ length: 4 }).map((_, index) => {
    const child = childData[index];
    return (
      <Container key={index} width="33%" height="100%">
        {child ? (
          <ChildCard
            childName={child.name}
            onClick={() => handleChildCardClick(child.uuid)}
          />
        ) : null}
      </Container>
    );
  });

  // 부족한 자식 데이터에 대한 처리 추가

  const handleChildCardClick = (childUuid: string) => {
    console.log(`ChildCard가 클릭되었습니다. childUuid: ${childUuid}`);

    // getChild 함수를 호출하고 childUuid를 전달하여 데이터를 가져올 수 있음
    getChild(childUuid)
      .then((response) => {
        setSelectedChild(response.data); // 데이터를 선택한 자식 상태에 저장
      })
      .catch((error) => {
        console.error("getChild 오류:", error);
      });
  };

  return (
    <MainContainer>
      <Container height="15%">{childCards}</Container>

      <Container height="25%">
        <Container
          height="100%"
          width="80%"
          flexDirection="column"
          align="start"
        >
          <Text>현재 {selectedChild?.name || ""}는</Text>
          <Text>매달 {selectedChild?.allowance || ""}원을 </Text>
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
