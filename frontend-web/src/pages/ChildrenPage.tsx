import React, { useEffect, useState } from "react";
import {
  Emoji,
  MainContainer,
  TextEmojiBox,
} from "../components/Common/Main/MainStyle";
import { Container } from "../components/Common/About/AboutContainer";
import { TextBox } from "../components/Common/About/AboutText";
//컴포넌트
import BalanceCompo, {
  Img_no,
} from "../components/Common/Balance/BalanceCompo";
import Quiz from "../components/Common/Quiz/Quiz";
import Challenge from "../components/Children/Challenge";

//이미지
import Coin from "../assests/image/main/Coin.png";
import { useRecoilState } from "recoil";

import { userDataState } from "../states/UserInfoState";
// 함수
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import api from "../apis/Api";

export const getBalance = (): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/balances?page=0&size=20", {
    // headers: {
    //   Authorization: `Bearer ${props.bearerToken}`,
    // },
  });
};

interface BalanceDataItem {
  idx: number;
  question: string;
  leftAnswer: string;
  rightAnswer: string;
  balanceGameStatus: string;
  countOfLeftAnswer: number;
  countOfRightAnswer: number;
  news: string;
}

function ChildrenPage() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [balanceData, setBalanceData] = useState<BalanceDataItem[]>([]);

  const navigate = useNavigate();
  const goBank = () => {
    navigate("/Bank");
  };
  const goMoneyPage = () => {
    navigate("/MoneyPage");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "";

    getBalance()
      .then((response) => {
        const balanceItems: BalanceDataItem[] = response.data.content;
        // "RUNNING"인 데이터만 필터링하여 새로운 배열 생성
        const runningBalanceItems = balanceItems.filter(
          (item) => item.balanceGameStatus === "RUNNING"
        );
        // 배열의 첫 번째 아이템만 선택
        const firstRunningBalanceItem = runningBalanceItems[0];

        if (firstRunningBalanceItem) {
          // 필터링된 데이터가 존재하면 첫 번째 아이템을 선택
          setBalanceData([firstRunningBalanceItem]);
        } else {
          // 필터링된 데이터가 없으면 빈 배열로 설정
          setBalanceData([]);
        }

        console.log(firstRunningBalanceItem);
      })
      .catch((error) => {
        console.error("Error fetching balance data:", error);
      });
  }, []);
  const userName = userData.name;
  const asset = "100,000원";
  const debt = "10,000원";
  return (
    <MainContainer>
      {/* 메인 타이틀 컨테이너 */}
      <Container height="20%">
        <Container
          height="100%"
          width="80%"
          flexDirection="column"
          align="start"
        >
          <Container height="30%">
            <TextBox height="100%">{userName}는 지금</TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              잔액 {asset}
            </TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              채무 {debt}
            </TextBox>
          </Container>
        </Container>
        <TextEmojiBox>
          <Emoji url={`${Coin}`} width="80%" height="40%" />
        </TextEmojiBox>
      </Container>

      {/* 통장잔고 컨테이너 */}
      {/* <Container height="25%"></Container> */}

      {/*주요기능 컴포넌트 컨테이너*/}
      <Container height="50%">
        {balanceData.length > 0 ? (
          <BalanceCompo
            balanceIdx={balanceData[0].idx}
            news={balanceData[0].news}
            showText={true}
            showImg={true}
            questionText={balanceData[0].question}
            buyText={balanceData[0].leftAnswer}
            notBuyText={balanceData[0].rightAnswer}
          />
        ) : (
          // 만약 balanceData가 비어있을 경우 처리할 내용
          <p>No balance data available</p>
        )}
      </Container>
      <Container height="50%" overflowy="hidden">
        <Quiz />
      </Container>
      <Container height="50%" flexDirection="column">
        <Container height="30%">
          <TextBox height="100%">챌린지</TextBox>
        </Container>
        <Challenge ismain="Y" />
      </Container>
    </MainContainer>
  );
}

export default ChildrenPage;
