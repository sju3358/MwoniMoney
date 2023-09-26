import React from "react";
import { Container } from "../Common/About/AboutContainer";
import { TextBox } from "../Common/About/AboutText";
import GoGoalMoney from "../Common/Bank/GoGoalMoney";
import BankGraph from "../Common/Bank/BankGraph";
import Card from "../Common/Bank/Card";
import CategoryTag from "../Common/About/AboutCategory";
import LoanList from "../Common/Bank/LoanList";
import LoanAdd from "../Common/Bank/LoanAdd";

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
      <Container height="55%" overflowy="hidden">
        <BankGraph creditScore={score} color="#5963e6" />
      </Container>

      {/* CardContainer */}
      <Card />

      {/* CategoryContainer */}
      <Container height="10%">
        <CategoryTag content1="모두" content2="대출중" content3="제안대기" />
      </Container>
      {/* LoanModal */}
      <Container height="100%" flexDirection="column">
        <LoanAdd />
        <LoanList />
        <LoanList />
        <LoanList />
      </Container>
      {/* </div> */}
    </>
  );
}

export default Bank;
