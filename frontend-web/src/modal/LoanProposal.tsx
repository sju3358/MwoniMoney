import * as React from "react";
import ModalBody from "./ModalBtn2";
import styled from "styled-components";

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

function LoanProposal() {
  const [selectedFrequency, setSelectedFrequency] = React.useState(""); // 첫 번째 SelectBox의 선택한 값
  const [selectedDay, setSelectedDay] = React.useState(""); // 두 번째 SelectBox의 선택한 값

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFrequency(event.target.value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  return (
    <ContentBox>
      <InputDiv>
        <InputInfo type="text" placeholder="대출명"></InputInfo>
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="내용"></InputInfo>
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="대출금" />
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="상환 날짜" />
      </InputDiv>
      <InputDiv>
        {/* 첫 번째 SelectBox */}
        <SelectBox value={selectedFrequency} onChange={handleFrequencyChange}>
          <option value="">주기 선택</option>
          <option value="매주">매주</option>
          <option value="매달">매달</option>
        </SelectBox>

        {/* 두 번째 SelectBox */}
        <SelectBox value={selectedDay} onChange={handleDayChange}>
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
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="대출금리" />
      </InputDiv>
    </ContentBox>
  );
}

export default LoanProposal;
