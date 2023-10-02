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
import { ChildCard } from "../components/Common/Main/ChildCard";
import GoalForMain from "../components/Common/GoalMoney/GoalMoneyForMain";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import api from "../apis/Api";
import {
  childDataState,
  childDataProps,
} from "../../src/states/ChildInfoState"; // Import the childDataState atom

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

  // Use the childDataState atom to manage selectedChild
  const [selectedChild, setSelectedChild] =
    useRecoilState<childDataProps>(childDataState);
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

    getChild(childUuid)
      .then((response) => {
        setSelectedChild(response.data); // Use setSelectedChild to update the selectedChild state
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
          <Text>현재 {selectedChild?.name || "아이를 선택해 주세요!"}는</Text>
          {/* Assuming you have an allowance property in the childDataState */}
          <Text>
            매달{" "}
            {selectedChild?.allowance !== undefined
              ? selectedChild.allowance
              : ""}
            원을{" "}
          </Text>
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
