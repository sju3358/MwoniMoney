import * as React from "react";
import ModalBody from "../modal/ModalBtn2";
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
  width: 95%;
  height: 50%;
  font-size: 1.3em;
  outline: none;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;

function Main() {
  const [selectedOption, setSelectedOption] = React.useState(""); // 선택된 옵션을 저장할 state

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ContentBox>
      <InputDiv>
        {/* 종류 선택을 위한 선택 박스 */}
        <SelectBox value={selectedOption} onChange={handleOptionChange}>
          <option value="">종류</option>
          <option value="옵션1">옵션1</option>
          <option value="옵션2">옵션2</option>
          {/* 필요한 만큼 옵션을 추가하세요 */}
        </SelectBox>
      </InputDiv>
      <InputDiv>
        <SelectBox value={selectedOption} onChange={handleOptionChange}>
          <option value="">내용</option>
          <option value="옵션1">옵션1</option>
          <option value="옵션2">옵션2</option>
          {/* 필요한 만큼 옵션을 추가하세요 */}
        </SelectBox>
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="챌린지명" />
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="가격" />
      </InputDiv>
      <InputDiv>
        <InputInfo type="date" placeholder="날짜" />
      </InputDiv>
    </ContentBox>
  );
}

export default function ChallengeCreate() {
  return (
    <ModalBody
      modal_start_text="자녀추가"
      modal_title="챌린지 만들기"
      modal_content={<Main />}
      modal_btn1="생성"
      modal_btn2="취소"
      btn_justify="space-around"
    />
  );
}
