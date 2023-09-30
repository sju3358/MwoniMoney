import React, { useState } from "react";
import styled from "styled-components";
import GoalCreate from "../../assests/image/GoalCreate.png";
import { Text, TextBox } from "../Common/About/AboutText";
import { Img, ImgBox } from "../../components/Common/About/AboutEmogi";
import { Container } from "../Common/About/AboutContainer";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAccountState } from "../../states/UserInfoState";
import { GoalMoneyState } from "../../states/GoalMoneyState";

const InputInfo = styled.input`
  background-color: transparent;
  border: none;
  // border: 1px solid red;
  border-bottom: 1px solid #969696;
  width: 85%;
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
  height: ${(props) => (props.height ? props.height : "70%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};
  border-radius: 10px;
  font-weight: bold;
  margin: 5%;
  border: 0;
  padding: 5px;
`;
interface InputListProps {
  title: string;
  placeholder: string;
}

function InputList(props: InputListProps) {
  const { title, placeholder } = props; // props를 디스트럭처링하여 사용

  return (
    <Container height="33%" flexDirection="column">
      <Container height="50%">
        <TextBox>{title}</TextBox>
      </Container>
      <Container height="50%" overflowy="hidden">
        <Container height="100%" width="75%" overflowy="hidden">
          <InputInfo type="text" placeholder={placeholder} />
        </Container>
        <Container height="100%" width="25%">
          <Btn fontSize="1.2em">저장</Btn>
        </Container>
      </Container>
    </Container>
  );
}

export default function CreatGoal() {
  const [inputValue, setInputValue] = useState("");
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);

  const navigate = useNavigate();
  const rate = "0.1"; //은행이 정한 이자율
  const account = userAccount.account; //해지 시 입금 계좌
  const handleClose = () => {
    navigate("/GoalMoney");
  };

  return (
    <Container height="100vh" flexDirection="column">
      {/* 짜금통 타이틀 */}
      <Container height="20%" flexDirection="column" overflowy="auto">
        <Container height="77%" overflowy="hidden">
          <TextBox
            TextBox_align="end"
            height="100%"
            marginL="0%"
            justifyContent="center"
          >
            짜금통
          </TextBox>
        </Container>
        <Container height="23%">
          <Text fontsize="0.9rem">
            갖고 싶은 물건을 위해 열심히 저축해보아요!
          </Text>
        </Container>
      </Container>
      {/* 이미지 삽입 */}
      <Container height="25%" overflowy="hidden">
        <ImgBox>
          <Img src={GoalCreate} />
        </ImgBox>
      </Container>
      {/* InputList : 입력받는 자리*/}
      <Container height="50%" flexDirection="column">
        <InputList
          title="물건명"
          placeholder="가지고 싶은 물건을 적어보세요."
        />
        <InputList title="물건금액" placeholder="물건금액" />
        <InputList
          title="정기용돈 출금 비율"
          placeholder="정기용돈에서 몇 % 저금할 건가요?"
        />
      </Container>
      {/* 은행이자율과 입금계좌에 대한 정보칸 */}
      <Container height="30%" flexDirection="column">
        <Container height="50%">
          <Container height="100%" width="60%">
            <TextBox width="100%">은행 이자율</TextBox>
          </Container>
          <Container
            width="50%"
            height="100%"
            justifyContent="center"
            align="center"
          >
            <Text fontsize="1.4rem" color="#969696" marginL="0%">
              {rate}%
            </Text>
          </Container>
        </Container>
        <Container height="50%">
          <Container height="100%" width="60%">
            <TextBox width="100%">입금 계좌</TextBox>
          </Container>
          <Container
            width="50%"
            height="100%"
            justifyContent="center"
            align="center"
          >
            <Text fontsize="1.4rem" color="#969696" marginL="0%">
              {account === "" ? (
                <Text fontsize="1rem" marginL="0%" color="red">
                  해지 시 입금받을 계좌를 등록해 주세요.
                </Text>
              ) : (
                account
              )}
            </Text>
          </Container>
        </Container>
      </Container>
      {/* 버튼 : axios 작동함 */}
      <Container height="10%" overflowy="hidden">
        <Btn>생성</Btn>
        <Btn backcolor="#ffffff" onClick={handleClose}>
          취소
        </Btn>
      </Container>
    </Container>
  );
}
