import React from "react";
import styled from "styled-components";
import { WhiteBox1 } from "../../Common/AboutWhilteContainer";
import { TextBox } from "../../Common/AboutText";
import { EmogiBox } from "../../Common//AboutEmogi";
import Pig from "../../../assests/image/Pig.png";

interface HalfBoxProps {
  width?: string;
  height?: string;
  flexDirection?: string;
}

const HalfBox = styled.div<HalfBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "50%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: center;
  align-items: center;
`;

function GoGoalMoney() {
  const childName = "지현";
  return (
    <WhiteBox1>
      <HalfBox width="70%" flexDirection="column">
        <TextBox fontSize="2em">짜금통</TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
          이번주 {childName}이가
        </TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
          모은 금액을 확인해보세요
        </TextBox>
      </HalfBox>
      <HalfBox width="30%">
        <EmogiBox backImg={Pig} />
      </HalfBox>
    </WhiteBox1>
  );
}

export default GoGoalMoney;
