import React from "react";
import { Container } from "../Common/About/AboutContainer";
import { TextBox } from "../Common/About/AboutText";
import GoGoalMoney from "../Common/Bank/GoGoalMoney";
import BankGraph from "../Common/Bank/BankGraph";
import Card from "../Common/Bank/Card";
import CategoryTag from "../Common/About/AboutCategory";
import ChallengeAdd from "../Common/Challenge/ChallengeAdd";
import LoanList from "../Common/Bank/LoanList";

function Bank() {
  const childName = "지현";
  const debt = 100000;
  const score = 50;

  return (
    <>
      {/* Title */}
      <Container height="15%" flexDirection="column">
        <TextBox>현재 {childName}이는</TextBox>
        <TextBox>{debt}만큼의 부채가 있어요!</TextBox>
      </Container>

      {/* GoGoalMoney */}
      <Container height="20%">
        <GoGoalMoney />
      </Container>

      {/* GraphContainer */}
      <Container height="55%">
        <BankGraph creditScore={score} color="#5963e6" />
      </Container>

      {/* CardContainer */}
      <Card />

      {/* CategoryContainer */}
      <Container height="10%">
        <CategoryTag content1="모두" content2="대출중" content3="제안대기" />
      </Container>

      {/* LoanListContainer */}
      {/* <div
        style={{
          width: "100vw",
          height: "60vh",
          border: "1px solid red",
          overflowX: "hidden", // 가로 스크롤을 숨김
          overflowY: "auto", // 세로 스크롤을 필요한 경우 표시
        }}
      > */}
      <Container height="100%" flexDirection="column">
        <ChallengeAdd />
        <LoanList />
        <LoanList />
        <LoanList />
      </Container>
      {/* </div> */}
    </>
  );
}

export default Bank;
