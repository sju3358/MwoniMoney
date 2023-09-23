import React from "react";
import styled from "styled-components";
import { EmogiBox } from "../../components/Common/About/AboutEmogi";
import GoalCreate from "../../assests/image/GoalCreate.png";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;
`;

const ModalTopBottom = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: bold;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: -2px;
  left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderTextContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const EmogiBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const InputInfo = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  height: 50px;
  font-size: 1.3em;
  outline: none;
  margin: 5px; /* 각 Input 사이의 간격을 조절할 수 있는 margin 설정 */
`;

export default function Main() {
  return (
    <MainContainer>
      <ModalContainer>
        <ModalTopBottom>짜금통</ModalTopBottom>
        <HeaderTextContainer>
          <div>갖고 싶은 물건을 위해 열심히 저축해보아요!</div>
        </HeaderTextContainer>
        <EmogiBoxContainer>
          <EmogiBox backImg={GoalCreate} width="50%" height="50%"></EmogiBox>
        </EmogiBoxContainer>
        <InputContainer>
          {/* Input 태그를 8개 추가 */}
          <InputInfo type="text" placeholder="입력 1"></InputInfo>
          <InputInfo type="text" placeholder="입력 2"></InputInfo>
          <InputInfo type="text" placeholder="입력 3"></InputInfo>
          <InputInfo type="text" placeholder="입력 4"></InputInfo>
          <InputInfo type="text" placeholder="입력 5"></InputInfo>
          <InputInfo type="text" placeholder="입력 6"></InputInfo>
          <InputInfo type="text" placeholder="입력 7"></InputInfo>
          <InputInfo type="text" placeholder="입력 7"></InputInfo>
        </InputContainer>
      </ModalContainer>
    </MainContainer>
  );
}
