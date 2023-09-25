import React from "react";
import styled from "styled-components";
import { EmogiBox } from "../../components/Common/About/AboutEmogi";
import GoalCreate from "../../assests/image/GoalCreate.png";
import { Text } from "../Common/About/AboutText";
import { Img, ImgBox } from "../../components/Common/About/AboutEmogi";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 0% 10% 0% 10%;
  display: flex;
  flex-direction: column;
`;
interface ContainerProps {
  width?: string | null;
  height?: string | null;
  display?: string | null;
  justifycontent?: string | null;
  alignitems?: string | null;
  margin?: string | null;
  padding?: string | null;
  flexdirection?: string | null;
}

export const Container = styled.div<ContainerProps>`
  // border: 1px solid black;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  box-sizing: border-box;
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ""};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  flex-direction: ${(props) =>
    props.flexdirection ? props.flexdirection : ""};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputInfo = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #969696;
  width: 95%;
  height: 50px;
  font-size: 1em;
  outline: none;
  margin: 5% 0% 5% 0%; /* 각 Input 사이의 간격을 조절할 수 있는 margin 설정 */
  padding-left: 5%;
`;

interface BtnProps {
  width?: string;
  height?: string;
  backcolor?: string;
  fontSize?: string;
}

const Btn = styled.button<BtnProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};
  border-radius: 10px;
  font-weight: bold;
  margin: 5%;
  border: 0;
  padding: 5px;
`;

export default function Main() {
  const rate = "0.1"; //은행이 정한 이자율
  const account = "000-0000-00000"; //해지 시 입금 계좌
  return (
    <MainContainer>
      <ModalContainer>
        <Container
          width="100%"
          height="100%"
          flexdirection="column"
          alignitems="center"
        >
          <Text fontweight="700" fontsize="2rem" padding="5%">
            짜금통
          </Text>
          <Text fontsize="0.9rem">
            갖고 싶은 물건을 위해 열심히 저축해보아요!
          </Text>
        </Container>
        <Container justifycontent="center">
          <ImgBox>
            <Img src={GoalCreate} />
          </ImgBox>
        </Container>
        <InputContainer>
          {/* Input 태그를 8개 추가 */}
          <Text>물건명</Text>
          <InputInfo type="text" placeholder="물건명"></InputInfo>
          <Text>물건금액</Text>
          <InputInfo type="text" placeholder="물건금액"></InputInfo>
          <Text>정기용돈 출금 비율</Text>
          <InputInfo
            type="text"
            placeholder="정기용돈에서 몇 % 저금할지"
          ></InputInfo>
        </InputContainer>
        <Container flexdirection="column" margin="2% 0% 0% 0%">
          <Text>은행 이자율</Text>
          <Text fontsize="1.2rem" color="#969696" margin="5% 0% 5% 0%">
            {rate}%
          </Text>
          <Text>해지 시 입금 계좌</Text>
          <Text fontsize="1.2rem" color="#969696" margin="5% 0% 5% 0%">
            {account}
          </Text>
        </Container>
        <Container>
          <Btn>생성</Btn>
          <Btn backcolor="#ffffff">취소</Btn>
        </Container>
      </ModalContainer>
    </MainContainer>
  );
}
