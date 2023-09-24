import React from "react";
import styled from "styled-components";

import { WhiteBox } from "../components/Common/About/AboutWhilteContainer";
import { Img, ImgBox } from "../components/Common/About/AboutEmogi";
import { Text } from "../components/Common/About/AboutText";

import RigthArrow from "../assests/image/main/RightArrow.png";
import Item from "../assests/image/Item.png";
import { Btn } from "../components/Common/About/AboutButton";
import History from "../components/Common/History";
import BankGraph from "../components/Common/Bank/BankGraph";
import Chart from "../components/Common/About/AboutChart";
import GaugeChart from "../components/Common/About/AboutChart";

const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

interface ContainerProps {
  width?: string | null;
  height?: string | null;
  display?: string | null;
  justifycontent?: string | null;
  alignitems?: string | null;
  margin?: string | null;
  padding?: string | null;
  flexdirection?: string | null;
}

export const Container = styled.div<ContainerProps>`
  // border: 1px solid black;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  box-sizing: border-box;
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ""};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  flex-direction: ${(props) =>
    props.flexdirection ? props.flexdirection : ""};
`;

function GoalMoney() {
  const name = "기택";
  const item = "게임기";
  const money = "100,1000";
  const date = "2023.09.13";
  const rate = "0.1";
  const score = 60;

  //number = 1 : 부모 , number = 0 : 자식
  const role: number = 1;

  return (
    <MainContainer>
      <ImgBox justifycontent="flex-start">
        <Img
          src={`${RigthArrow}`}
          width="8%"
          height="8%"
          padding="0% 0% 0% 3%"
        />
      </ImgBox>
      <Container
        width="100%"
        height="28%"
        flexdirection="column"
        justifycontent="center"
        alignitems="center"
      >
        <WhiteBox
          width="50%"
          height="100%"
          borderradius="100px"
          display="flex"
          justifycontent="center"
          alignitems="center"
        >
          <ImgBox>
            <Img src={`${Item}`} width="80%" height="80%" />
          </ImgBox>
        </WhiteBox>
      </Container>
      <Container height="auto" flexdirection="column" padding="5% 0% 0% 5%">
        {role === 1 ? (
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
      <Container height="80%" justifycontent="center" alignitems="center">
        <WhiteBox>
          <Container
            height="95%"
            flexdirection="column"
            justifycontent="space-between"
          >
            <Text fontsize="1.125rem" fontweight="700" padding="5% 0% 0% 5%">
              세부내용
            </Text>
            <Container width="100%" height="100%">
              {/* <GaugeChart /> */}
            </Container>
            <Text fontsize="1.125rem" fontweight="700" padding="5% 0% 0% 5%">
              현재까지 모은 금액
            </Text>
            <Text fontsize="1.125rem" padding="5% 0% 0% 5%">
              {money}원
            </Text>
            <Text fontsize="1.125rem" fontweight="700" padding="5% 0% 0% 5%">
              시작일
            </Text>
            <Text fontsize="1.125rem" padding="5% 0% 0% 5%">
              {date}
            </Text>
            <Text fontsize="1.125rem" fontweight="700" padding="5% 0% 0% 5%">
              이자율
            </Text>
            <Text fontsize="1.125rem" padding="5% 0% 0% 5%">
              {rate}%
            </Text>
          </Container>
        </WhiteBox>
      </Container>
      <Container height="60%" justifycontent="center" alignitems="center">
        <WhiteBox>
          <Text fontsize="1.125rem" fontweight="700" padding="5%">
            저금내역
          </Text>
          <History />
          <History />
        </WhiteBox>
      </Container>
      {role === 1 ? (
        <>
          <Container
            height="10%"
            justifycontent="center"
            alignitems="flex-start"
          >
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
