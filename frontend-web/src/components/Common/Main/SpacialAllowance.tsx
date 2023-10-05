import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceText from "./AllowanceText";
import AllowanceInput from "./AllowanceInput";
import { useRecoilState } from "recoil";
import { specialMoney, isSpecialMoney } from "../../../states/AllowanceState";
import { Text } from "../About/AboutText";

//axios
import api from "../../../apis/Api";

/*input 상자 */

const InputContainer = styled.div`
  // border: 1px solid black;
  box-sizing: border-box;
  // background-color: green;
  width: 100%;
  height: 30%;
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
// height="50%"
// type="number"
// value={selectedDate}
// name="selectedDate"
// placeholder="날짜 선택하기"
// onChange={handleDateChange}

function SpacialAllowance() {
  const childStateString: string | null = localStorage.getItem("childState");

  let childUuid: string | null = null;
  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    childUuid = childState.childDataState.uuid;
    console.log(childUuid);
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }
  const [specialAllowance, setSpecialAllowance] = useState(0);

  const [SpecialMoneyData, setSpecialMoneyData] = useRecoilState(specialMoney);
  const [IsSpecialMoney, setIsSpecialMoney] = useRecoilState(isSpecialMoney);

  const handleSpecialMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setSpecialAllowance(newValue);
  };

  const clearPostData = () => {
    setSpecialAllowance(0);
  };
  const handleSubmit = () => {
    if (specialAllowance < 1) {
      alert("0원보다 크게 설정해주세요");
      return;
    }
    const postData = {
      childUUID: childUuid,
      reward: specialAllowance,
    };
    //axios
    api
      .post(`/v1/members/reward`, postData)
      .then((response) => {
        console.log("POST 요청 성공:", response.data);
        clearPostData(); //전송 후 clear
      })
      .catch((error) => {
        if (error.response) {
          console.error("POST 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          console.error("POST  요청 실패 - 요청을 보낼 수 없음");
        } else {
          console.error("POST 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  };

  if (IsSpecialMoney) {
    setSpecialAllowance(SpecialMoneyData);
    setIsSpecialMoney(false);
  }

  return (
    <WhiteBox>
      {/* <AllowanceText
        text1={"특별용돈"}
        text2={"퀴즈로 얻을 수 있는 용돈으로 얼마까지 줄까요?"}
      /> */}
      <Text fontsize="1.8em" fontweight="bold" marginL="5%">
        특별용돈
      </Text>
      <Text style={{ margin: "5% 0% 0% 5%" }}>
        퀴즈로 얻을 수 있는 용돈으로
      </Text>
      <Text style={{ margin: "3% 0% 0% 5%" }}>얼마까지 줄까요?</Text>
      {/* 40% */}
      <InputContainer>
        <AllowanceInput
          value={specialAllowance}
          name="specialmoney"
          height="50%"
          type="number"
          placeholder=" 가격"
          onChange={handleSpecialMoneyChange}
        />
      </InputContainer>
      <AllowanceCategory al="special" />
      <BtnContainer>
        <Btn onClick={handleSubmit}>충전하기</Btn>
      </BtnContainer>
    </WhiteBox>
  );
}

export default SpacialAllowance;
