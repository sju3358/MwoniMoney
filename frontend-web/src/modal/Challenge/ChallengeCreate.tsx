import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { newChallenge } from "../../states/ChallengeState";

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

export const InputNumberInfo = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  height: 50%;
  font-size: 1.3em;
  &::before {
    content: attr(placeholder);
  }
  ,
  &:valid::before,
  &:focus::before {
    // content: attr(placeholder);
    display: none;
  }
  ,
`;

export const InputDateInfo = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  height: 50%;
  &::before {
    content: attr(placeholder);
    font-size: 1.3em;
    width: 100%;
    height: 100%;
  }
  ,
  &:valid::before,
  &:focus::before {
    display: none;
  }
  ,
  &::placeholder {
    font-weight: 700;
  }
`;

export const SelectBox = styled.select`
  border: none;
  // border: 1px solid rgba(131, 129, 129, 0.851);
  border-bottom: 1px solid black;
  width: 100%;
  height: 50%;
  font-size: 1.3em;
  outline: none;
  text-align: left;
`;

function CreateChallenge() {
  const [newChallengeData, setNewChallengeData] = useRecoilState(newChallenge);
  const [availableOptions, setAvailableOptions] = React.useState<string[]>([]);

  const handleChangeState = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      // 카테고리가 변경되면 해당하는 종류를 설정하고
      // 종류 옵션도 업데이트
      const selectedCategory = value;
      const options = availableOptionsByCategory[selectedCategory] || [];
      setAvailableOptions(options);

      setNewChallengeData({
        ...newChallengeData,
        category: value,
        title: "", // 종류 초기화
      });
    } else {
      setNewChallengeData({
        ...newChallengeData,
        [name]: value,
      });
    }
  };

  const availableOptionsByCategory: Record<string, string[]> = {
    집안일: ["애완동물케어", "빨래", "청소", "설거지"],
    공부: ["국어 공부", "수학 공부", "영어 공부", "사회 공부"],
    습관: ["일어나서 이불개기", "아침 인사드리기"],
    효도: ["부모님 안아드리기", "부모님에게 사랑한다하기"],
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
        {/* 카테고리 선택을 위한 선택 박스 */}
        <SelectBox
          name="category"
          value={newChallengeData.category}
          onChange={handleChangeState}
        >
          <option value="">카테고리</option>
          {/* value값과 availableOptionsByCategory의 key값과 일치해야함 */}
          <option value="집안일">집안일</option>
          <option value="공부">공부</option>
          <option value="습관">습관</option>
          <option value="효도">효도</option>
        </SelectBox>
      </InputDiv>
      <InputDiv>
        {/* 선택된 카테고리에 따른 종류 선택을 위한 선택 박스 */}
        <SelectBox
          name="title"
          value={newChallengeData.title}
          onChange={handleChangeState}
          disabled={newChallengeData.category === ""}
        >
          <option value="">종류</option>
          {availableOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectBox>
      </InputDiv>
      <InputDiv>
        <InputInfo
          type="text"
          name="memo"
          value={newChallengeData.memo}
          placeholder="챌린지명"
          onChange={handleChangeState}
        />
      </InputDiv>
      <InputDiv>
        <InputNumberInfo
          type="number"
          name="reward"
          value={newChallengeData.reward}
          placeholder="상금"
          onChange={handleChangeState}
          required
        />
      </InputDiv>
      <InputDiv style={{ alignItems: "center" }}>
        <InputDateInfo
          type="date"
          name="endTime"
          value={newChallengeData.endTime}
          placeholder="끝나는 날짜를 입력해주세요"
          min={minDate}
          onChange={handleChangeState}
          required
        />
      </InputDiv>

      {/* <>
        <div>확인용</div>
        <span>{newChallengeData.category}</span>
        <span>{newChallengeData.title}</span>
        <span>{newChallengeData.memo}</span>
        <span>{newChallengeData.reward}</span>
        <span>{newChallengeData.endTime}</span>
      </> */}
    </ContentBox>
  );
}

export default CreateChallenge;
