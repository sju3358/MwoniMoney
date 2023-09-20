import React from "react";
import { Container } from "../components/Parents/Bank/Bank";
import { TextBox } from "../components/Common/AboutText";
import GoGoalMoney from "../components/Parents/Bank/GoGoalMoney";

function Bank() {
  const childName = "지현";
  const debt = 100000;
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
      <Container height="40%"></Container>

      {/* CardContainer */}
      <Container height="15%"></Container>

      {/* CategoryContainer */}
      <Container height="10%"></Container>

      {/* LoanListContainer */}
      <Container height="40%"></Container>
    </>
  );
}

export default Bank;
