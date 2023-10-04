import { Container } from "../Common/About/AboutContainer";
import Header from "../Layout/header";
import Chatting from "./Chatting";
import WordCloud from "./WordCloud";
import React from "react";
export default function ChattingPage({ balanceGameIdx = 1 }) {
  return (
    <Container height="100vh" flexDirection="column">
      <Container height="10%">
        <Header />
      </Container>
      <Container height="30%" width="100%" overflowy="hidden">
        <WordCloud balanceGameIdx={balanceGameIdx} />
      </Container>
      <Container
        height="60%"
        width="100%"
        justifyContent="center"
        // overflowx="auto"
      >
        <Chatting balanceGameIdx={balanceGameIdx} />
      </Container>
    </Container>
  );
}
