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

export const getBalance = (props: GetRegisterProps): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/balances?page=0&size=20", {
    // headers: {
    //   Authorization: `Bearer ${props.bearerToken}`,
    // },
  });
};

interface GetRegisterProps {
  bearerToken: string;
}

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

function Balance() {
  const [balanceData, setBalanceData] = useState<BalanceDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  useEffect(() => {
    api
      .get(`/v1/balances?page=${curPage}&size=5`)
      .then((response) => {
        console.log(response);
        const data: BalanceDataItem[] = response.data.content;

        const newData = balanceData;
        const sizeOfData = data.length;
        data.forEach((item) => {
          if (data[sizeOfData - 1].idx != item.idx) newData.push(item);
        });

        setBalanceData(newData);
        setIsLastPage(response.data.last);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching balance data:", error);
        setIsLoading(false);
      });
  }, [curPage]);

  window.addEventListener("scroll", () => {
    console.log("스크롤이벤트");
    if (isLastPage != true) setCurPage(curPage + 1);
  });

  return (
    <MainContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {balanceData &&
            balanceData.length > 0 &&
            // Render items with balanceGameStatus "RUNNING"
            balanceData
              .filter((item) => item.balanceGameStatus === "RUNNING")
              .map((item, index) => (
                <BalanceContainer key={index} height="40%">
                  <BalanceCompo
                    balanceIdx={item.idx}
                    news={item.news}
                    showText={true}
                    showImg={false}
                    questionText={item.question}
                    buyText={item.leftAnswer}
                    notBuyText={item.rightAnswer}
                    countOfLeftAnswer={item.countOfLeftAnswer}
                    countOfRightAnswer={item.countOfRightAnswer}
                  />
                </BalanceContainer>
              ))}

          {balanceData &&
            balanceData.length > 0 &&
            // Render items with balanceGameStatus "END"
            balanceData
              .filter((item) => item.balanceGameStatus === "END")
              .map((item, index) => (
                <ListContainer key={index}>
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
                        {item.question}
                      </Text>
                      <IntoBalanceResult
                        news={item.news}
                        countOfLeftAnswer={item.countOfLeftAnswer}
                        countOfRightAnswer={item.countOfRightAnswer}
                      />
                    </TextContainer>
                  </WhiteBox>
                </ListContainer>
              ))}
        </>
      )}

      <ImgContainer>
        <ImgBox>
          <Img width="100%" height="100%" padding="0%" src={`${Chat}`} />
        </ImgBox>
      </ImgContainer>
    </MainContainer>
  );
}

export default Balance;
