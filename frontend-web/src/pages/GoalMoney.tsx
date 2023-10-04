//React
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//component
import { Container } from "../components/Common/About/AboutContainer";
import { WhiteBox } from "../components/Common/About/AboutWhilteContainer";
import { EmogiBox, ImgBox } from "../components/Common/About/AboutEmogi";
import { Text, TextBox } from "../components/Common/About/AboutText";
import { Btn } from "../components/Common/About/AboutButton";
import History from "../components/Common/History";
import { DemoLiquid } from "../components/Common/About/AboutChart";
import { userAccountState, userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";
import { GoalCheckState, GoalMoneyState } from "../states/GoalMoneyState";
import { DetailReport } from "../components/Common/GoalMoney/GoalMoneyStyle";
//api
import api from "../apis/Api";
import api_ver2 from "../apis/ApiForMultiPart";

const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

function GoalMoney() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);
  const [goalCheck, setGoalCheck] = useRecoilState(GoalCheckState);
  const [userAccout, setUserAccount] = useRecoilState(userAccountState);
  //Navigation
  const navigate = useNavigate();

  // get 받아서 다시 recoil에 넣기
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api
          .get("v1/members")
          .then((response) => {
            const receivedData = response.data;

            setGoalMoney((prev) => ({
              ...prev,
              goalName: receivedData.smallAccount.goalName,
              goalBalance: receivedData.smallAccount.goalBalance,
              goalMoney: receivedData.smallAccount.goalMoney,
              saveRatio: receivedData.smallAccount.saveRatio,
              image: receivedData.smallAccount.imageFilename,
            }));

            setGoalCheck((prev) => ({
              ...prev,
              goalState: true,
            }));

            setUserData((prev) => ({
              ...prev,
              memberRole: receivedData.memberRole,
            }));
          })
          .catch((error) => {
            console.log("계좌조회 " + error);
          });

        // 계좌번호 get하기
        await api_ver2
          .get("v1/accounts", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { type: "SMALL" },
          })
          .then((response2) => {
            const receivedData2 = response2.data;
            setUserAccount((prev) => ({
              ...prev,
              account: receivedData2.number,
              status: receivedData2.status,
              startDate: receivedData2.createdDay,
              remain: receivedData2.remain,
            }));
          })
          .catch((error) => {
            console.log("계좌조회 " + error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const deleteGoal = async () => {
    try {
      await api
        .patch("v1/accounts/small-account")
        .then(() => {
          setGoalCheck((prev) => ({
            ...prev,
            goalState: false,
          }));
          alert("짜금통이 해지되었습니다.");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const name = userData.name;
  const role = userData.memberRole;
  const item = goalMoney.goalName;
  const money = goalMoney.goalMoney;
  const date = userAccout.startDate;
  const img =
    // "https://mwonimoney.s3.ap-northeast-2.amazonaws.com/goal/" +
    goalMoney.image;
  const rate = goalMoney.saveRatio;
  const goalBalance = userAccout.remain; //지금까지 모은 금액
  const num = money / goalBalance; //지금까지 모은 달성률
  const goalPoint = num / 100;
  const check = goalCheck.goalState;

  // 함수를 위한 변수s
  const GoCreatGoal = () => {
    if (role === "CHILD") {
      navigate("/CreatGoal");
    }
  };
  // 출력문
  // console.log(goalMoney);
  // console.log(goalCheck);
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
          {goalCheck.goalState === false ? (
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
            <EmogiBox
              backImg={`${img}`}
              width="100%"
              height="100%"
              borderA="100px"
            />
          )}
        </WhiteBox>
      </Container>
      <Container height="25%" flexDirection="column">
        {goalCheck.goalState === false ? (
          <>
            <Text
              fontsize="1.3rem"
              fontweight="700"
              marginL="0%"
              textalign="center"
            >
              가지고 싶은 물건이 있다면
            </Text>
            <Text
              fontsize="1.3rem"
              fontweight="700"
              marginL="0%"
              textalign="center"
            >
              짜금통계좌를 개설해보세요.
            </Text>
          </>
        ) : role === "PARENT" ? (
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
      <Container height="40%">
        <WhiteBox>
          <Container height="5%" />
          <Container height="15%">
            <TextBox height="100%">저금내역</TextBox>
          </Container>
          <Container height="80%" flexDirection="column" overflowy="auto">
            <History />
            <History />
          </Container>
        </WhiteBox>
      </Container>
      {role === "CHILD" && check == true && (
        <Container height="10%">
          <Btn
            backcolor="rgba(255, 255, 255, 0.50)"
            width="90%"
            height="70%"
            onClick={deleteGoal}
          >
            해제
          </Btn>
        </Container>
      )}
    </MainContainer>
  );
}

export default GoalMoney;
