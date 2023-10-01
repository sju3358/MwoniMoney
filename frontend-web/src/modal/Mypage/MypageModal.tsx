import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Modal from "@mui/material/Modal";
import { userCheckState, userDataState } from "../../states/UserInfoState";
import { Container } from "../../components/Common/About/AboutContainer";
import { TextBox } from "../../components/Common/About/AboutText";
import { api } from "../../apis/Api";
import { WhiteBox1 } from "../../components/Common/About/AboutWhilteContainer";
import { ModalBtn } from "../ModalBtn1";

function MypageModal() {
  const [open, setOpen] = React.useState(false);
  const [userData] = useRecoilState(userDataState);
  const [userCheck] = useRecoilState(userCheckState);

  const name = userData.name;
  const birth = userData.birthday;
  const memberRole = userData.memberRole;
  const email = userData.email;

  const allTrue = Object.values(userCheck).every((value) => value === true);

  useEffect(() => {
    if (allTrue) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [allTrue]);

  const handleClose = async () => {
    try {
      api.patch("/v1/members", {
        name: userData.name,
        email: userData.email,
        birthday: userData.birthday,
        memberRole: userData.memberRole,
      });
      setOpen(false);
      alert("axios 성공");
    } catch (error) {
      alert("axios 실패");
      console.error(error);
      throw error;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        height="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <WhiteBox1 height="30%" width="85%" flexDirection="column">
          <Container height="30%">
            <TextBox>정보 저장</TextBox>
          </Container>
          <Container
            height="50%"
            flexDirection="column"
            justifyContent="center"
            align="center"
          >
            <TextBox height="15%" fontSize="1.2em">
              이름 : {name}
            </TextBox>
            <TextBox height="15%" fontSize="1.2em">
              생년월일 : {birth}
            </TextBox>
            <TextBox height="15%" fontSize="1.2em">
              역할 : {memberRole === "PARENT" ? "부모" : "아이"}
            </TextBox>
            <TextBox height="15%" fontSize="1.2em">
              이메일 :{email}
            </TextBox>
          </Container>
          <Container height="20%">
            <ModalBtn onClick={handleClose}>저장</ModalBtn>
          </Container>
        </WhiteBox1>
      </Container>
    </Modal>
  );
}

export default MypageModal;
