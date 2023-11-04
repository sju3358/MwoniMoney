import React, { useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "../About/WhiteBox";
import AllowanceCategory from "./AllowanceCategory";
import AllowanceInput from "./AllowanceInput";
import { useRecoilState } from "recoil";
import { specialMoney, isSpecialMoney } from "../../../states/AllowanceState";
import { Text } from "../About/AboutText";
import Button from "../About/AboutButton";

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

  const [SpecialMoneyData] = useRecoilState(specialMoney);
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
        clearPostData();
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
      <Text fontsize="1.8em" fontF="TheJamsil7Bold" marginL="5%">
        특별용돈
      </Text>
      <Text style={{ margin: "5% 0% 0% 5%" }}>
        퀴즈로 얻을 수 있는 용돈으로
      </Text>
      <Text style={{ margin: "3% 0% 0% 5%" }}>얼마까지 줄까요?</Text>
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
        <Button
          width="95%"
          height="70%"
          fontS="1.5em"
          borderR="12px"
          afbackcolor="#ffc107"
          onClick={handleSubmit}
        >
          충전하기
        </Button>
      </BtnContainer>
    </WhiteBox>
  );
}

export default SpacialAllowance;
