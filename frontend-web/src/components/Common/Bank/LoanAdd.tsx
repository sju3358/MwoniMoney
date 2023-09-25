import React from "react";
import { Container } from "../About/AboutContainer";
import LoanProposal from "../../../modal/LoanProposal";
import ModalBody3 from "../../../modal/ModalImg";
import { EmogiBox } from "../History";
import AddChildImg from "../../../assests/image/AddBox.png";

function LoanAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <Container height="12%">
      <button
        onClick={handleOpen}
        style={{ width: "90%", height: "100%", border: "none" }}
      >
        <EmogiBox backImg={AddChildImg} width="100%" height="100%" />
      </button>
      <ModalBody3
        useState_open={open}
        set_open={setOpen}
        modal_title="챌린지 만들기"
        modal_content={<LoanProposal />}
        modal_btn1="생성"
        modal_btn2="취소"
        btn_justify="space-around"
      />
    </Container>
  );
}

export default LoanAdd;
