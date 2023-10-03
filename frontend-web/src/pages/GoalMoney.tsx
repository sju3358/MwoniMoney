import React from "react";
import styled from "styled-components";

import { Container } from "../components/Common/About/AboutContainer";
import { WhiteBox } from "../components/Common/About/AboutWhilteContainer";
import { Img, ImgBox } from "../components/Common/About/AboutEmogi";
import { Text, TextBox } from "../components/Common/About/AboutText";

import Item from "../assests/image/Item.png";
import { Btn } from "../components/Common/About/AboutButton";
import History from "../components/Common/History";
import { DemoLiquid } from "../components/Common/About/AboutChart";
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { GoalCheckState, GoalMoneyState } from "../states/GoalMoneyState";
import { DetailReport } from "../components/Common/GoalMoney/GoalMoneyStyle";
import api from "../apis/Api";

const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

function GoalMoney() {
  const [userData] = useRecoilState(userDataState);
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);
  const [goalCheck, setGoalCheck] = useRecoilState(GoalCheckState);
  // get 받아서 다시 recoil에 넣기
  // api.get("v1/members/small-account", {});

  const name = userData.name;
  const item = goalMoney.goalName;
  const money = goalMoney.goalMoney;
  const date = goalMoney.goalStartDate;
  const rate = goalMoney.saveRatio;
  const num = money / goalMoney.goalBalance; //지금까지 모은 금액
  const goalBalance = goalMoney.goalBalance; //지금까지 모은 금액
  const goalPoint = num / 100;
  const role = userData.memberRole;
  // 함수를 위한 변수s
  const navigate = useNavigate();
  const GoCreatGoal = () => {
    if (role === "CHILD") {
      navigate("/CreatGoal");
    }
  };
  // 출력문
  console.log(goalMoney);
  console.log(goalCheck);
  return (
    <MainContainer>
      <Container height="5%" />
      <Container height="28%">
        <WhiteBox
          width="50%"
          height="100%"
          borderradius="100px"
          display="flex"
          justifycontent="center"
          alignitems="center"
        >
          {goalCheck.goalName ||
          goalCheck.goalBalance ||
          goalCheck.goalMoney ||
          goalCheck.goalStartDate ||
          goalCheck.image ||
          goalCheck.saveRatio === false ? (
            <Container
              height="100%"
              onClick={GoCreatGoal}
              flexDirection="column"
            >
              {role === "PARENT" ? (
                <Text textalign="center" fontweight="bolder" marginL="0%">
                  아직 짜금통이 없어요
                </Text>
              ) : (
                <Text textalign="center" fontweight="bolder" marginL="0%">
                  짜금통 만들러 가기
                </Text>
              )}
            </Container>
          ) : (
            <ImgBox>
              <Img src={`${Item}`} width="80%" height="80%" />
            </ImgBox>
          )}
        </WhiteBox>
      </Container>
      <Container height="25%" flexDirection="column">
        {role === "PARENT" ? (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {name}님이
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {item}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {money}원을 모았어요!
            </Text>
          </>
        ) : (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {item}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {money}원을 모았어요!
            </Text>
          </>
        )}
      </Container>
      <Container height="90%">
        <WhiteBox>
          <Container height="100%" flexDirection="column">
            <Container height="10%">
              <TextBox marginL="0%" justifyContent="center" height="100%">
                세부내용
              </TextBox>
            </Container>
            <Container width="100%" height="80%">
              {/* <Chart value={score} color="#e60eb0" /> */}
              <DemoLiquid percent={goalPoint} />
            </Container>
            {/* 현재 현황 보고서 */}
            <Container height="40%" flexDirection="column">
              <DetailReport
                title="현재까지 모은 금액"
                content={`${goalBalance} 원`}
              />
              <DetailReport title="시작일" content={`${date}`} />
              <DetailReport title="이자율" content={`${rate} %`} />
            </Container>
          </Container>
        </WhiteBox>
      </Container>
      <Container height="60%">
        <WhiteBox>
          <Container height="10%">
            <TextBox height="100%">저금내역</TextBox>
          </Container>
          <Container height="90%" flexDirection="column" overflowy="auto">
            <History />
            <History />
          </Container>
        </WhiteBox>
      </Container>
      {role === "PARENT" ? (
        <>
          <Container height="10%">
            <Btn backcolor="rgba(255, 255, 255, 0.50)" width="90%" height="70%">
              해제
            </Btn>
          </Container>
        </>
      ) : (
        <></>
      )}
    </MainContainer>
  );
}

export default GoalMoney;
