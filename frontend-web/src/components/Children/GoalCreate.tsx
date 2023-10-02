import React, { useState } from "react";
import GoalCreate from "../../assests/image/GoalCreate.png";
import { Text, TextBox } from "../Common/About/AboutText";
import { Img, ImgBox } from "../../components/Common/About/AboutEmogi";
import { Container } from "../Common/About/AboutContainer";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAccountState } from "../../states/UserInfoState";
import { GoalMoneyState } from "../../states/GoalMoneyState";
import { Btn, InputList } from "../Common/GoalMoney/GoalMoneyStyle";
import GoalModal from "../../modal/GoalMoney/GoalModal";
import { ModalState } from "../../states/ModalState";
import api from "../../apis/Api";
import api_ver2 from "../../apis/ApiForMultiPart";

export default function CreatGoal() {
  const [inputValue, setInputValue] = useState("");
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);
  const [open, setOpen] = useRecoilState(ModalState);

  const navigate = useNavigate();
  const rate = "0.1"; //은행이 정한 이자율
  const account = userAccount.account; //해지 시 입금 계좌
  const handleClose = () => {
    navigate("/GoalMoney");
  };

  // 모달 열리는 클릭 이벤트
  const hanldeModal = () => {
    setOpen(true);
  };

  // axios 날리는
  const handleAxios = () => {
    const jsonData = {
      goalName: goalMoney.goalName,
      goalMoney: goalMoney.goalMoney,
      saveRatio: goalMoney.saveRatio,
    };

    const formData = new FormData();
    formData.append(
      "info",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    formData.append(
      "image",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" }),
      goalMoney.image
    );

    console.log(formData);

    api_ver2
      .post("v1/members/small-account", formData, {
        headers: {
          "Contest-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("짜금통을 생성했습니다.");
        navigate("/GoalMoney");
      })
      .catch((error) => {
        console.error(error);
        alert("짜금통 생성에 실패했습니다.");
      });
  };
  // 출력문
  // console.log(goalMoney);
  // console.log(open);

  return (
    <Container height="100vh" flexDirection="column">
      <GoalModal goalModal_open={open} />
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
          <Text fontsize="1rem">
            갖고 싶은 물건을 위해 열심히 저축해보아요!
          </Text>
        </Container>
      </Container>
      {/* 이미지 삽입 */}
      <Container height="25%" overflowy="hidden">
        <ImgBox>
          <Img src={GoalCreate} onClick={hanldeModal} />
        </ImgBox>
      </Container>
      {/* InputList : 입력받는 자리*/}
      <Container height="50%" flexDirection="column">
        <InputList
          title="물건명"
          placeholder="가지고 싶은 물건을 적어보세요."
          type="text"
          id="goalName"
        />
        <InputList
          title="물건금액"
          placeholder="물건금액"
          type="number"
          id="goalMoney"
        />
        <InputList
          title="정기용돈 출금 비율"
          placeholder="정기용돈에서 몇 % 저금할 건가요?"
          type="number"
          id="saveRatio"
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
        <Btn onClick={handleAxios}>생성</Btn>
        <Btn backcolor="#ffffff" onClick={handleClose}>
          취소
        </Btn>
      </Container>
    </Container>
  );
}
