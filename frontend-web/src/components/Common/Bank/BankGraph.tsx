import React from "react";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { GaugeChart } from "../About/AboutChart";

interface LoanImpoProps {
  title: string;
  content: number;
  isloan: boolean;
}

function LoanImpo({ title, content, isloan }: LoanImpoProps) {
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
      {isloan === true ? (
        <TextBox
          height="70%"
          fontSize="1em"
          justifyContent="center"
          marginL="0%"
        >
          {content}%
        </TextBox>
      ) : (
        <TextBox
          height="70%"
          fontSize="1em"
          justifyContent="center"
          marginL="0%"
        >
          {content}점
        </TextBox>
      )}
    </Container>
  );
}

interface BankGraphProps {
  creditScore: any;
  color: string;
  avgInterest: number;
}

function BankGraph({ avgInterest, creditScore, color }: BankGraphProps) {
  const scroe = 50;
  return (
    <WhiteBox1 flexDirection="column">
      <TextBox height="20%">신용등급</TextBox>
      {/*그래프*/}
      <Container height="55%" overflowy="hidden">
        <GaugeChart value={creditScore} />
        {/* Pass creditScore as a prop */}
      </Container>
      {/**금리, 신용점수 */}
      <Container height="25%">
        <LoanImpo
          title="대출금리"
          content={parseFloat(avgInterest.toFixed(2))}
          isloan={true}
        />
        <LoanImpo title="신용점수" content={creditScore} isloan={false} />
      </Container>
    </WhiteBox1>
  );
}

export default BankGraph;
