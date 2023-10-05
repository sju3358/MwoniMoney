import React from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceText from "./AllowanceText";
import AllowanceInput from "./AllowanceInput";

/*input 상자 */

const InputContainer = styled.div`
  // border: 1px solid black;
  box-sizing: border-box;
  // background-color: green;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/*Btn 상자 */

const BtnContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Btn = styled.div`
  background-color: #fbd56e;
  border-radius: 12px;
  width: 95%;
  height: 70%;
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  &:active {
    background-color: #ffc107;
    transform: translate(0em, 0.2em);
  }
`;

function SpacialAllowance() {
  return (
    <WhiteBox>
      <AllowanceText
        text1={"특별용돈"}
        text2={"퀴즈로 얻을 수 있는 용돈으로 얼마까지 줄까요?"}
      />
      <InputContainer>
        <AllowanceInput height="50%" type="number" placeholder=" 가격" />
      </InputContainer>
      <AllowanceCategory />
      <BtnContainer>
        <Btn>충전하기</Btn>
      </BtnContainer>
    </WhiteBox>
  );
}

export default SpacialAllowance;
