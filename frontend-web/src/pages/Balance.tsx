import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom"; // useNavigate 추가

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
  const navigate = useNavigate();

  function handleImgBoxClick() {
    navigate("/chatting");
  }
  const [runningBalanceGameData, setRunningBalanceGameData] = useState<
    BalanceDataItem[]
  >([]);
  const [endBalanceData, setEndBalanceData] = useState<BalanceDataItem[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadNextFlag, setLoadNextFlag] = useState(0);

  useEffect(() => {
    api
      .get(`/v1/balances?status=RUNNING`)
      .then((response) => {
        setRunningBalanceGameData(response.data);
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

  function loadNextPage() {
    setLoadNextFlag(loadNextFlag + 1);
  }

  return (
    <MainContainer>
      {runningBalanceGameData.map((data) => {
        return (
          <BalanceContainer height="40%">
            <BalanceCompo
              balanceIdx={data.idx}
              news={data.news}
              showText={false}
              showImg={false}
              questionText={data.question}
              buyText={data.leftAnswer}
              notBuyText={data.rightAnswer}
              countOfLeftAnswer={data.countOfLeftAnswer}
              countOfRightAnswer={data.countOfRightAnswer}
            />
          </BalanceContainer>
        );
      })}

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
                <Text color="#C4C4C4" fontsize="0.75rem" padding="0% 0% 0% 5%">
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

      {isLastPage === false ? (
        <button
          onClick={loadNextPage}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            height: "5%",
            fontSize: "1.2em",
            backgroundColor: "#fbd56e",
            borderRadius: "10px",
            fontWeight: "bold",
            borderStyle: "none",
            margin: "auto",
          }}
        >
          더보기
        </button>
      ) : (
        ""
      )}

      <ImgContainer>
        <ImgBox onClick={handleImgBoxClick}>
          <Img width="100%" height="100%" padding="0%" src={`${Chat}`} />
        </ImgBox>
      </ImgContainer>
    </MainContainer>
  );
}

export default Balance;
