//React
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//component
import { Container } from "../../components/Common/About/AboutContainer";
import { WhiteBox } from "../../components/Common/About/AboutWhilteContainer";
import { EmogiBox, ImgBox } from "../../components/Common/About/AboutEmogi";
import { Text, TextBox } from "../../components/Common/About/AboutText";
import Button from "../../components/Common/About/AboutButton";
import History from "../../components/Common/History";
import { DemoLiquid } from "../../components/Common/About/AboutChart";
import { userAccountState, userDataState } from "../../states/UserInfoState";
import { useRecoilState } from "recoil";
import { GoalCheckState, GoalMoneyState } from "../../states/GoalMoneyState";
import { DetailReport } from "../../components/Common/GoalMoney/GoalMoneyStyle";
//api
import api from "../../apis/Api";
import api_ver2 from "../../apis/ApiForMultiPart";

const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

interface TransactionType {
  id: number;
  money: number;
  balance: number;
  memo: string;
  time: string;
}
// React 및 기타 import 문은 유지하도록 하겠습니다.

function GoalChild() {
  interface AccountType {
    number: string | null;
    remain: number;
    createdDay: string;
    status: string;
    finAccountTransaction: TransactionType[];
  }

  const [userData, setUserData] = useRecoilState(userDataState);
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);
  const [goalCheck, setGoalCheck] = useRecoilState(GoalCheckState);
  const [accountData, setAccountData] = useState<AccountType | null>(null);
  const navigate = useNavigate();

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
            console.log(error);
          });

        await api_ver2
          .get("v1/accounts", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { type: "SMALL" },
          })
          .then((response2) => {
            const receivedData2 = response2.data;

            setAccountData({
              number: receivedData2.number,
              remain: receivedData2.remain,
              createdDay: receivedData2.createdDay,
              status: receivedData2.status,
              finAccountTransaction: receivedData2.finAccountTransaction,
            });
          })
          .catch((error) => {
            console.log(error);
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
        .delete("v2/accounts/small-account", {
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        })
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
  const date = accountData?.createdDay || "";
  const img = goalMoney.image;
  const rate = goalMoney.saveRatio;
  const goalBalance = accountData?.remain || 0;
  const num = money - goalBalance;
  const goalPoint = goalBalance / money;
  const check = goalCheck.goalState;

  const GoCreatGoal = () => {
    if (role === "CHILD") {
      navigate("/CreatGoal");
    }
  };

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
              <Text textalign="center" fontweight="bolder" marginL="0%">
                짜금통 만들러 가기
              </Text>
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
        ) : (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {item}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {money}원을 모아야해요!
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
              <DemoLiquid percent={goalPoint} />
            </Container>
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
            {accountData?.finAccountTransaction.map(
              (transaction: TransactionType, index: number) => (
                <History
                  key={index}
                  money={transaction.money}
                  time={new Date(transaction.time).toLocaleDateString()}
                />
              )
            )}
          </Container>
        </WhiteBox>
      </Container>
      {role === "CHILD" && check == true && (
        <Container height="10%">
          <Button
            backcolor="rgba(255, 255, 255, 0.50)"
            width="90%"
            height="70%"
            onClick={deleteGoal}
          >
            해제
          </Button>
        </Container>
      )}
    </MainContainer>
  );
}

export default GoalChild;
