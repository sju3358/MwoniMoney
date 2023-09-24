import React from "react";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import Chart from "../About/AboutChart";

interface LoanImpoProps {
  title: string;
  content: number;
}

function LoanImpo({ title, content }: LoanImpoProps) {
  return (
    <Container width="50%" height="100%" flexDirection="column">
      <TextBox
        height="30%"
        fontSize="1.2em"
        justifyContent="center"
        marginL="0%"
      >
        {title}
      </TextBox>
      <TextBox height="70%" fontSize="1em" justifyContent="center" marginL="0%">
        {content} 원
      </TextBox>
    </Container>
  );
}

interface BankGraphProps {
  creditScore: any;
  color: string;
}

function BankGraph({ creditScore, color }: BankGraphProps) {
  return (
    <WhiteBox1 flexDirection="column">
      <TextBox height="20%">신용등급</TextBox>
      {/*그래프*/}
      <Container height="55%">
        <Chart value={creditScore} color={color} />
        {/* Pass creditScore as a prop */}
      </Container>
      {/**금리, 신용점수 */}
      <Container height="25%">
        <LoanImpo title="대출금리" content={1000} />
        <LoanImpo title="신용점수" content={1000} />
      </Container>
    </WhiteBox1>
  );
}

export default BankGraph;
