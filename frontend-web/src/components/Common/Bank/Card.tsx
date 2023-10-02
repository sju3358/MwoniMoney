import React from "react";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { moneyFormat } from "../utils";

function Card() {
  const principal = 100000;
  const interest = 129000;

  return (
    <Container height="15%" justifyContent="space-around">
      <WhiteBox1 width="45%" backcolor="#b79df5" flexDirection="column">
        <TextBox fontSize="1.2em">원금</TextBox>
        <TextBox fontSize="1em" fontWeight="normal">
          {moneyFormat(principal)}
        </TextBox>
      </WhiteBox1>
      <WhiteBox1 width="45%" backcolor="#fbd56e" flexDirection="column">
        <TextBox fontSize="1.2em">이자</TextBox>
        <TextBox fontSize="1em" fontWeight="normal">
          {moneyFormat(interest)}
        </TextBox>
      </WhiteBox1>
    </Container>
  );
}

export default Card;
