import React, { useState, useEffect } from "react";
import ModalBody from "./ModalBtn2";
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
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;
export const InputDateInfo = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(131, 129, 129, 0.851);
  // border: 1px solid rgba(131, 129, 129, 0.851);
  // border: 1px solid #fbd56e;
  padding: 10px;
  // background-color: white;
  // background: rgba(250, 249, 252, 1);
  // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  // border: 1px solid rgba(131, 129, 129, 0.2);
  // border-radius: 8px;
  &::-webkit-calendar-picker-indicator {
    // position: absolute;
    // left: 0;
    // top: 0;
    // width: 100%;
    // height: 100%;
    // background: transparent;
    // color: transparent;
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

  // const [selectedFrequency, setSelectedFrequency] = React.useState(""); // 첫 번째 SelectBox의 선택한 값
  // const [selectedDay, setSelectedDay] = React.useState(""); // 두 번째 SelectBox의 선택한 값

  // const handleFrequencyChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setSelectedFrequency(event.target.value);
  // };

  // const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedDay(event.target.value);
  // };

  //input창 handle
  const handleChangeState = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewLoanData({
      ...newLoanData,
      [name]: value,
    });

    // if (name === "everykey") {
    //   // 카테고리가 변경되면 해당하는 종류를 설정하고
    //   // 종류 옵션도 업데이트
    //   // setSelectedFrequency("");
    //   // setSelectedDay("");
    // } else {
    //   setNewLoanData({
    //     ...newLoanData,
    //     [name]: value,
    //     // everykey: selectedFrequency,
    //     // everyvalue: selectedDay,
    //   });
    // }
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
      {/* <InputDiv>
        <SelectBox
          name="everykey"
          value={selectedFrequency}
          onChange={handleFrequencyChange}
        >
          <option value="">주기 선택</option>
          <option value="매주">매주</option>
          <option value="매달">매달</option>
        </SelectBox>


        <SelectBox
          name="everyvalue"
          value={selectedDay}
          onChange={handleDayChange}
        >
          <option value="">선택</option>
          {selectedFrequency === "매주" && (
            <>
              <option value="월요일">월요일</option>
              <option value="화요일">화요일</option>
              <option value="수요일">수요일</option>
              <option value="목요일">목요일</option>
              <option value="금요일">금요일</option>
              <option value="토요일">토요일</option>
              <option value="일요일">일요일</option>
            </>
          )}
          {selectedFrequency === "매달" && (
            <>
              {Array.from({ length: 28 }, (_, index) => (
                <option key={index + 1} value={`${index + 1}`}>{`${
                  index + 1
                }일`}</option>
              ))}
            </>
          )}
        </SelectBox>
      </InputDiv> */}
      <InputDiv>
        <InputInfo
          type="number"
          name="rate"
          value={newLoanData.rate}
          placeholder="대출금리"
          onChange={handleChangeState}
        />
      </InputDiv>
      <>
        {/* <div>확인용</div>
        <span>{newLoanData.name}</span>
        <span>{newLoanData.content}</span>
        <span>{newLoanData.amount}</span>
        <span>{newLoanData.deadline}</span>
        <span>{newLoanData.rate}</span> */}
        {/* <span>{selectedFrequency}</span>
        <span>{selectedDay}</span> */}
      </>
    </ContentBox>
  );
}

export default LoanProposal;
