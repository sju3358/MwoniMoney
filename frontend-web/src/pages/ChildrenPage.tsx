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

import { userAccountState, userDataState } from "../states/UserInfoState";
// 함수
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import api from "../apis/Api";
import ChatbotLink from "../components/Common/Main/ChatbotLink";
import api_ver2 from "../apis/ApiForMultiPart";
import { moneyFormat } from "../components/Common/utils";

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
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [balanceData, setBalanceData] = useState<BalanceDataItem[]>([]);

  const navigate = useNavigate();
  const goBank = () => {
    navigate("/Bank");
  };
  const goMoneyPage = () => {
    navigate("/MoneyPage");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken") || "";
        api
          .get("/v1/balances/today")
          .then((response) => {
            const firstRunningBalanceItem = response.data;

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

        //  Account Axios 연결 get
        // 계좌번호 get하기
        api_ver2
          .get("v1/accounts", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
            params: { type: "GENERAL" },
          })
          .then((response2) => {
            const receivedData2 = response2.data;
            setUserAccount((prev) => ({
              ...prev,
              account: receivedData2.number,
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
  const userName = userData.name;
  const asset = moneyFormat(userAccount.remain);
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
            <TextBox height="100%">{userName}님은 지금</TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              잔액 {asset} 원
            </TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              채무 {debt}
            </TextBox>
          </Container>
        </Container>
        <TextEmojiBox EmojiBox_justify="start">
          <Emoji url={`${Coin}`} width="80%" height="50%" />
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
      <Container height="30%">
        <ChatbotLink />
      </Container>

      <Container height="40%" flexDirection="column">
        <Container height="15%">
          <TextBox height="50%">챌린지</TextBox>
        </Container>
        <Challenge ismain="Y" />
      </Container>
    </MainContainer>
  );
}

export default ChildrenPage;
