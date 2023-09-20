import React from "react";
import { WhiteBox1 } from "../../Common/AboutWhilteContainer";
import styled from "styled-components";
import { TextBox } from "../../Common/AboutText";

interface HalfBoxProps {
  width?: string;
  height?: string;
}

const HalfBox = styled.div<HalfBoxProps>`
  border: 1px solid black;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "50%")};
  height: ${(props) => (props.height ? props.height : "100%")};
`;

function GoGoalMoney() {
  const childName = "지현";
  return (
    <WhiteBox1>
      <HalfBox width="70%">
        <TextBox fontSize="2em">짜금통</TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
          이번주 {childName}이가
        </TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
          모은 금액을 확인해보세요
        </TextBox>
      </HalfBox>
      <HalfBox width="30%"></HalfBox>
    </WhiteBox1>
  );
}

export default GoGoalMoney;
