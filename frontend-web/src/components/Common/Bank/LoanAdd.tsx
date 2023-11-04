import React from "react";
import { Container } from "../About/AboutContainer";
import LoanProposal from "../../../modal/LoanProposal";
import ModalLoan from "../../../modal/Loan/ModalLoan";
import { EmogiBox } from "../History";
import AddChildImg from "../../../assests/image/AddBox.png";
import Button from "../About/AboutButton";

function LoanAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <Container height="20%">
      <Button
        width="90%"
        height="90%"
        backcolor="transparent"
        display=""
        justifyC=""
        alignI=""
        onClick={handleOpen}
      >
        <EmogiBox backImg={AddChildImg} width="100%" height="100%" />
      </Button>
      <ModalLoan
        useState_open={open}
        set_open={setOpen}
        modal_title="대출 생성하기"
        modal_content={<LoanProposal />}
        modal_btn1="생성"
        modal_btn2="취소"
        btn_justify="space-around"
      />
    </Container>
  );
}

export default LoanAdd;
