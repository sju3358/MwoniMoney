import * as React from "react";
import styled from "styled-components";

export const ContentBox = styled.div`
  // border: 1px solid black;
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
  // border: 1px solid red;
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

export default function RegistChild() {
  return (
    <ContentBox>
      <InputDiv>
        <InputInfo type="text" placeholder="이름" />
      </InputDiv>
      <InputDiv>
        <InputInfo type="date" placeholder="생년월일" />
      </InputDiv>
      <InputDiv>
        <InputInfo type="text" placeholder="계좌번호" />
      </InputDiv>
    </ContentBox>
  );
}
