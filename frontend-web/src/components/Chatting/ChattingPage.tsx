import { Container } from "../Common/About/AboutContainer";
import Chatting from "./Chatting";
import WordCloud from "./WordCloud";
import React from "react";
export default function ChattingPage({ balanceGameIdx = 1 }) {
  return (
    <Container>
      <WordCloud balanceGameIdx={balanceGameIdx} />
      <Chatting balanceGameIdx={balanceGameIdx} />
    </Container>
  );
}
