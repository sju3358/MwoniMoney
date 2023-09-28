import * as React from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { newChallengeState } from "../../states/ChallengeState";

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

interface InputDivProp {
  align?: string | undefined;
}

export const InputDiv = styled.div<InputDivProp>`
  // border: 1px solid red;
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: center;
  ${(props) => (props.align ? props.align : "center")};
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

function CreateChallenge() {
  const [inputValue, setInputValue] = React.useState("");

  const [selectedOption, setSelectedOption] = React.useState(""); // 선택된 옵션을 저장할 state

  const [newChallenge, setNewChallenge] = useRecoilState(newChallengeState);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    // setNewChallenge(event.target.value);
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

export default CreateChallenge;
