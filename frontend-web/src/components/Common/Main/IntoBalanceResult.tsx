import * as React from "react";
import { Img } from "../About/AboutEmogi";
import { ModalBody2, ModalBody3 } from "../../../modal/ModalImg";
import BalanceResult from "../../../modal/ProgressModal";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";

function IntoBalanceResult() {
  const [open, setOpen] = React.useState(false);
  console.log(open + "33");
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
    console.log(open + "111");
  };
  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          backgroundColor: "transparent",
          width: "5%",
          height: "100%",
          border: "none",
          padding: "0%",
          margin: "0%",
        }}
      >
        <Img src={LeftArrow} width="100%" height="100%" />
      </button>
      <ModalBody2
        useState_open={open}
        set_open={setOpen}
        modal_title="어느 쪽이 많을까요?"
        modal_content={<BalanceResult />} /**테그 넣는 방법*/
        modal_btn1="닫기"
        modal_btn2=""
        btn_justify="space-around"
      />
    </>
  );
}

export default IntoBalanceResult;
