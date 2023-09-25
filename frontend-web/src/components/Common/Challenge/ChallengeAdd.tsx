import React from "react";
import styled from "styled-components";
import AddBox from "../../../assests/image/AddBox.png";
import AddChildImg from "../../../assests/image/AddBox.png";
import CreateChallenge from "../../../modal/Challenge/ChallengeCreate";
import ModalBody3 from "../../../modal/ModalImg";
import { EmogiBox } from "../History";
import { Container } from "../About/AboutContainer";

const AddContainer = styled.button`
  border: 1px solid black;
  width: 100%;
  height: 12%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
const Add = styled.div`
  // border: 1px solid red;
  width: 90%;
  height: 80%;
  background-image: url(${AddBox});
  background-size: 100% 100%;
`;

function ChallengeAdd() {
  const [open, setOpen] = React.useState(false);
  console.log(open + "33");
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
    console.log(open + "111");
  };
  return (
    <Container height="10%">
      <button
        onClick={handleOpen}
        style={{ width: "90%", height: "90%", border: "none" }}
      >
        <EmogiBox backImg={AddChildImg} width="100%" height="100%" />
      </button>
      <ModalBody3
        useState_open={open}
        set_open={setOpen}
        modal_title="챌린지 만들기"
        modal_content={<CreateChallenge />}
        modal_btn1="생성"
        modal_btn2="취소"
        btn_justify="space-around"
      />
    </Container>
  );
}

export default ChallengeAdd;
