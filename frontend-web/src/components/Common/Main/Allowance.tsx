import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceText from "./AllowanceText";
import AllowanceInput from "./AllowanceInput";
import { Text } from "../About/AboutText";
//
import { useRecoilState } from "recoil";
import { allowanceMoney } from "../../../states/AllowanceState";
import { isAllowanceMoney } from "../../../states/AllowanceState";
import { SpanText } from "../About/AboutText";

//axios
import api from "../../../apis/Api";

/*input 상자 */
const InputContainer = styled.div`
  // background-color: green;
  // border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 50%;
`;

/*Btn 상자 */

const BtnContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center; /* 수직 가운데 정렬 */
`;

const Btn = styled.button`
  border: none;
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

function Allowance() {
  const childStateString: string | null = localStorage.getItem("childState");

  let childUuid: string | null = null;
  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    childUuid = childState.childDataState.uuid;
    console.log(childUuid);
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  const [selectedDate, setSelectedDate] = useState(1);
  const [money, setMoney] = useState(0);
  const [allowanceMoneyData, setAllowanceMoneyData] =
    useRecoilState(allowanceMoney);
  const [IsAllowanceMoney, setIsAllowanceMoney] =
    useRecoilState(isAllowanceMoney);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setSelectedDate(newValue);
  };
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputMoney = parseFloat(e.target.value);
    setMoney(inputMoney);
    console.log(money);
  };
  const clearPatchData = () => {
    setMoney(0);
    setSelectedDate(1);
  };

  const handleSubmit = () => {
    if (selectedDate > 28 || selectedDate < 1) {
      alert("1~28일 사이를 선택해주세요.");
      return;
    }
    const patchData = {
      regularAllowance: money,
      regularAllowanceDay: selectedDate,
    };
    //axios
    api
      .patch(`/v1/members/regularAllowance?childUUID=${childUuid}`, patchData)
      .then((response) => {
        console.log("PATCH 요청 성공:", response.data);
        clearPatchData(); //전송 후 clear
      })
      .catch((error) => {
        if (error.response) {
          console.error("PATCH 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          console.error("PATCH  요청 실패 - 요청을 보낼 수 없음");
        } else {
          console.error("PATCH 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  };

  if (IsAllowanceMoney) {
    console.log("IsAllowanceMoney", allowanceMoneyData);
    setMoney(allowanceMoneyData);
    setIsAllowanceMoney(false);
  }

  return (
    <WhiteBox>
      {/* <AllowanceText
        text1={"정기용돈"}
        text2={"정기 용돈으로 언제 얼마를 줄까요?"}
      /> */}
      <Text fontsize="1.8em" fontweight="bold" marginL="5%">
        정기용돈
      </Text>
      <InputContainer>
        {/* 60% */}
        <Text style={{ margin: "5% 0% 0% 5%" }}>
          <SpanText>언제</SpanText> 송금하실건가요?
        </Text>
        <AllowanceInput
          height="40%"
          type="number"
          value={selectedDate}
          name="selectedDate"
          placeholder="날짜 선택하기"
          onChange={handleDateChange}
        />
        <Text style={{ margin: "0% 0% 0% 5%" }}>
          <SpanText>얼마</SpanText>를 송금하실건가요?
        </Text>
        <AllowanceInput
          value={money}
          name="money"
          height="35%"
          type="number"
          placeholder="가격"
          onChange={handleMoneyChange}
        />
      </InputContainer>
      <AllowanceCategory al="regular" /> {/* 15% */}
      <BtnContainer>
        {/* 20% */}
        <Btn onClick={handleSubmit}>용돈주기</Btn>
      </BtnContainer>
    </WhiteBox>
  );
}

export default Allowance;
