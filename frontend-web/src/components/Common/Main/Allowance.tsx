import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceInput from "./AllowanceInput";
import { Text } from "../About/AboutText";
//Recoil
import { useRecoilState } from "recoil";
import { allowanceMoney } from "../../../states/AllowanceState";
import { isAllowanceMoney } from "../../../states/AllowanceState";
import Button from "../About/AboutButton";

//axios
import api from "../../../apis/Api";
import { getChildState } from "../utils";
// Input 상자
const InputContainer = styled.div`
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

function Allowance() {
  let childUuid: string | null = null;
  getChildState();

  const [selectedDate, setSelectedDate] = useState(1);
  const [money, setMoney] = useState(0);
  const [allowanceMoneyData] = useRecoilState(allowanceMoney);
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
      <Text fontF="TheJamsil7Bold" fontsize="1.8em" marginL="5%">
        정기용돈
      </Text>
      <InputContainer>
        <Text style={{ margin: "5% 0% 0% 5%" }}>언제 송금하실건가요?</Text>
        <AllowanceInput
          height="40%"
          type="number"
          value={selectedDate}
          name="selectedDate"
          placeholder="날짜 선택하기"
          onChange={handleDateChange}
        />
        <Text style={{ margin: "0% 0% 0% 5%" }}>얼마를 송금하실건가요?</Text>
        <AllowanceInput
          value={money}
          name="money"
          height="35%"
          type="number"
          placeholder="가격"
          onChange={handleMoneyChange}
        />
      </InputContainer>
      <AllowanceCategory al="regular" />
      <BtnContainer>
        <Button
          borderR="12px"
          width="95%"
          height="70%"
          fontS="1.5em"
          afbackcolor="#ffc107"
          onClick={handleSubmit}
        >
          용돈주기
        </Button>
      </BtnContainer>
    </WhiteBox>
  );
}

export default Allowance;
