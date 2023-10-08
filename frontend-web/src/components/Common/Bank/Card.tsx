import React from "react";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { moneyFormat } from "../utils";

interface Props {
  principal: number;
  interest: number;
}
function Card({ principal, interest }: Props) {
  return (
    <Container height="15%" justifyContent="space-around">
      <WhiteBox1 width="40%" backcolor="#b79df5" flexDirection="column">
        <TextBox marginL="10%" fontSize="1.2em">
          원금
        </TextBox>
        <TextBox marginL="10%" fontSize="1em">
          {moneyFormat(principal)}
        </TextBox>
      </WhiteBox1>
      <WhiteBox1 width="40%" backcolor="#fbd56e" flexDirection="column">
        <TextBox marginL="10%" fontSize="1.2em">
          이자
        </TextBox>
        <TextBox marginL="10%" fontSize="1em">
          {moneyFormat(interest)}
        </TextBox>
      </WhiteBox1>
    </Container>
  );
}

export default Card;
