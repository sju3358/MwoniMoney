import React, { useState, useEffect } from "react";
import styled from "styled-components";

//recoil
import { useRecoilState } from "recoil";
import { newLoan } from "../states/LoanState";

export const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  margin-top: 0%;
`;

export const InputDiv = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputInfo = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  height: 50%;
  font-size: 1.3em;
  outline: none;
`;

export const SelectBox = styled.select`
  border: none;
  border-bottom: 1px solid black;
  width: 48%;
  height: 50%;
  font-size: 1.3em;
  outline: none;
  text-align: left;
`;

export const InputDateInfo = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(131, 129, 129, 0.851);
  padding: 10px;
  }
  &::before {
    content: attr(placeholder);
    width: 100%;
    height: 100%;
  }
  ,
  &:valid::before,
  &:focus::before {
    display: none;
  }
`;

function LoanProposal() {
  const [newLoanData, setNewLoanData] = useRecoilState(newLoan);

  //input창 handle
  const handleChangeState = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewLoanData({
      ...newLoanData,
      [name]: value,
    });
  };

  const [minDate, setMinDate] = useState<string>("");
  useEffect(() => {
    const today = new Date();
    const minDateString = today.toISOString().split("T")[0];
    setMinDate(minDateString);
  }, []);

  return (
    <ContentBox>
      <InputDiv>
        <InputInfo
          type="text"
          name="name"
          value={newLoanData.name}
          placeholder="대출명"
          onChange={handleChangeState}
        ></InputInfo>
      </InputDiv>
      <InputDiv>
        <InputInfo
          type="text"
          name="content"
          value={newLoanData.content}
          placeholder="내용"
          onChange={handleChangeState}
        ></InputInfo>
      </InputDiv>
      <InputDiv>
        <InputInfo
          type="number"
          name="amount"
          value={newLoanData.amount}
          placeholder="대출금"
          onChange={handleChangeState}
        />
      </InputDiv>
      <InputDiv style={{ alignItems: "center" }}>
        <InputDateInfo
          type="date"
          name="deadline"
          value={newLoanData.deadline}
          placeholder="끝나는 날짜를 입력해주세요"
          min={minDate}
          onChange={handleChangeState}
          required
        />
      </InputDiv>

      <InputDiv>
        <InputInfo
          type="number"
          name="rate"
          value={newLoanData.rate}
          placeholder="대출금리"
          onChange={handleChangeState}
        />
      </InputDiv>
    </ContentBox>
  );
}

export default LoanProposal;
