//React
import React, { useState } from "react";
import styled from "styled-components";
import { GoalMoneyState, GoalCheckState } from "../../states/GoalMoneyState";
import { userAccountState } from "../../states/UserInfoState";
import { DemoLiquid } from "../Common/About/AboutChart";
import { TextBox, Text } from "../Common/About/AboutText";
import { WhiteBox } from "../Common/About/AboutWhilteContainer";
import { Container } from "../Common/About/AboutContainer";
import { EmogiBox } from "../Common/About/AboutEmogi";
import { useRecoilState } from "recoil";

const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

function GoalParent() {
  const [goalMoney] = useRecoilState(GoalMoneyState);
  const [userAccout] = useRecoilState(userAccountState);
  const money = goalMoney.goalMoney;
  const goalBalance = userAccout.remain;
  const goalPoint = goalBalance / money;

  // localState child값 불어오기
  let ChildName: string | null = null;
  let GoalName: string | null = null;
  let GoalRemain: number | null = null;
  let GoalImage: any | null = null;
  const childStateString: string | null = localStorage.getItem("childState");

  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    ChildName = childState.childDataState.name;
    GoalName = childState.childDataState.goalName;
    GoalRemain = childState.childDataState.remain;
    GoalImage = childState.childDataState.imageFilename;
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  const a_ChildName = ChildName;
  const a_GoalName = GoalName;
  const a_GoalRemain = GoalRemain;
  const Image =
    "https://mwonimoney.s3.ap-northeast-2.amazonaws.com/goal/" + GoalImage;

  return (
    <MainContainer>
      {/* <Container height="2%" /> */}
      <Container height="25%">
        <WhiteBox
          width="45%"
          height="90%"
          borderradius="100px"
          display="flex"
          justifycontent="center"
          alignitems="center"
        >
          {a_GoalName === undefined ? (
            <Container height="100%" flexDirection="column">
              <Text textalign="center" fontweight="bolder" marginL="0%">
                아직 짜금통이 없어요.
              </Text>
            </Container>
          ) : (
            <EmogiBox
              backImg={`${Image}`}
              width="100%"
              height="100%"
              borderA="100px"
            />
          )}
        </WhiteBox>
      </Container>
      <Container height="20%" flexDirection="column">
        {a_GoalName === undefined ? (
          <>
            <Text
              fontsize="1.3rem"
              fontweight="700"
              marginL="0%"
              textalign="center"
            >
              {a_ChildName}에게
            </Text>
            <Text
              fontsize="1.3rem"
              fontweight="700"
              marginL="0%"
              textalign="center"
            >
              짜금통계좌 추천해주세요.
            </Text>
          </>
        ) : (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {a_ChildName}님이
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {a_GoalName}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {a_GoalRemain}원을 모았어요!
            </Text>
          </>
        )}
      </Container>
      <Container height="55%">
        <WhiteBox>
          <Container height="100%" flexDirection="column">
            <Container height="4%" />
            <Container height="10%" overflowy="hidden">
              <TextBox marginL="0%" justifyContent="center" height="100%">
                {a_ChildName}의 달성률
              </TextBox>
            </Container>
            <Container width="90%" height="90%" align="center">
              <DemoLiquid percent={goalPoint} />
            </Container>
          </Container>
        </WhiteBox>
      </Container>
    </MainContainer>
  );
}

export default GoalParent;
