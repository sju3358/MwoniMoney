import React from "react";
import { Container } from "../../Parents/Bank/Bank";
import { WhiteBox1 } from "../../Common/AboutWhilteContainer";
import { TextBox } from "../../Common/AboutText";

function Card() {
  const principal = 100000;
  const interest = 129000;
  return (
    <Container height="15%" justifyContent="space-around">
      <WhiteBox1 width="45%" backColor="#b79df5" flexDirection="column">
        <TextBox fontSize="1.2em">원금</TextBox>
        <TextBox fontSize="1em" fontWeight="normal">
          {principal}
        </TextBox>
      </WhiteBox1>
      <WhiteBox1 width="45%" backColor="#fbd56e" flexDirection="column">
        <TextBox fontSize="1.2em">이자</TextBox>
        <TextBox fontSize="1em" fontWeight="normal">
          {interest}
        </TextBox>
      </WhiteBox1>
    </Container>
  );
}

export default Card;
