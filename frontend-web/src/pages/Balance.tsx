import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import api from "../apis/Api";

import {
  MainContainer,
  TextContainer,
  BalanceContainer,
} from "../components/Common/Main/Main";

import BalanceCompo from "../components/Common/Balance/BalanceCompo";
import styled from "styled-components";
import { Text } from "../components/Common/About/AboutText";
import { WhiteBox } from "../components/Common/About/AboutWhilteContainer";
import { Img } from "../components/Common/About/AboutEmogi";

// 모달
import ProgressModal from "../modal/ProgressModal";
import IntoBalanceResult from "../components/Common/Main/IntoBalanceResult";

// 이미지
import LeftArrow from "../assests/image/main/LeftArrow.png";
import Chat from "../assests/image/main/Chat.png";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
`;
const ImgBox = styled.button`
  border: 0;
  background-color: #ffffff;
  padding: 5%;
  border-radius: 50px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

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

console.warn = console.error = () => {};
// or IIFE
(() => {
  console.warn = console.error = () => {};
})();

function Balance() {
  const [todayBalanceGame, setTodayBalanceGame] = useState<BalanceDataItem>();
  const [endBalanceData, setEndBalanceData] = useState<BalanceDataItem[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadNextFlag, setLoadNextFlag] = useState(0);

  useEffect(() => {
    api
      .get(`/v1/balances/today`)
      .then((response) => {
        setTodayBalanceGame(response.data);
      })
      .catch((error) => {
        console.error("Error fetching balance data:", error);
      });
  }, []);

  useEffect(() => {
    if (isLastPage !== true) {
      api
        .get(`/v1/balances/end?page=${curPage}&size=5`)
        .then((response) => {
          setEndBalanceData(endBalanceData.concat(response.data.content));
          setCurPage(curPage + 1);
          setIsLastPage(response.data.last);
        })
        .catch((error) => {
          console.error("Error fetching balance data:", error);
        });
    }
  }, [loadNextFlag]);

  return (
    <MainContainer>
      {todayBalanceGame === undefined ? (
        <>오늘의 밸런스게임이 없습니다</>
      ) : (
        <BalanceContainer height="40%">
          <BalanceCompo
            balanceIdx={todayBalanceGame.idx}
            news={todayBalanceGame.news}
            showText={true}
            showImg={false}
            questionText={todayBalanceGame.question}
            buyText={todayBalanceGame.leftAnswer}
            notBuyText={todayBalanceGame.rightAnswer}
            countOfLeftAnswer={todayBalanceGame.countOfLeftAnswer}
            countOfRightAnswer={todayBalanceGame.countOfRightAnswer}
          />
        </BalanceContainer>
      )}
      <>
        {endBalanceData.map((endBalanceData) => {
          return (
            <ListContainer key={endBalanceData.idx}>
              <WhiteBox margin="0% 0% 5% 0%" padding="0%">
                <TextContainer
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    color="#C4C4C4"
                    fontsize="0.75rem"
                    padding="0% 0% 0% 5%"
                  >
                    {endBalanceData.question}
                  </Text>
                  <IntoBalanceResult
                    news={endBalanceData.news}
                    countOfLeftAnswer={endBalanceData.countOfLeftAnswer}
                    countOfRightAnswer={endBalanceData.countOfRightAnswer}
                  />
                </TextContainer>
              </WhiteBox>
            </ListContainer>
          );
        })}
      </>

      <button
        onClick={() => {
          setLoadNextFlag(loadNextFlag + 1);
        }}
      >
        {isLastPage === false ? "로딩" : "마지막 페이지입니다"}
      </button>
      <ImgContainer>
        <ImgBox>
          <Img width="100%" height="100%" padding="0%" src={`${Chat}`} />
        </ImgBox>
      </ImgContainer>
    </MainContainer>
  );
}

export default Balance;
