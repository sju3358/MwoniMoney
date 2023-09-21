import React from "react";
import styled from "styled-components";
import { WhiteBox } from "./WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceText from "./AllowanceText";
import AllowanceInput from "./AllowanceInput";

/*input 상자 */
const InputContainer = styled.div`
  // background-color: green;
  // border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 40%;
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
  align-items: center; /* 수직 가운데 정렬 */
`;

const Btn = styled.div`
  background-color: #fbd56e;
  border-radius: 4%;
  width: 95%;
  height: 80%;
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

function Allowance() {
  return (
    <WhiteBox>
      <AllowanceText
        text1={"정기용돈"}
        text2={"정기 용돈으로 언제 얼마를 줄까요?"}
      />
      <InputContainer>
        <AllowanceInput
          height="50%"
          type="date"
          placeholder="주기/날짜 선택하기"
        />
        <AllowanceInput height="50%" type="number" placeholder=" 가격" />
      </InputContainer>
      <AllowanceCategory />
      <BtnContainer>
        <Btn>용돈주기</Btn>
      </BtnContainer>
    </WhiteBox>
  );
}

export default Allowance;
