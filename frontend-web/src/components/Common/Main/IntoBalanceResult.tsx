import * as React from "react";
import { Img } from "../About/AboutEmogi";
import { ModalBody2, ModalBody3 } from "../../../modal/ModalImg";
import BalanceResult from "../../../modal/ProgressModal";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";
import Button from "../About/AboutButton";

interface IntoBalanceResultProps {
  news: string;
  countOfLeftAnswer: number;
  countOfRightAnswer: number;
}

function IntoBalanceResult(props: IntoBalanceResultProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Button
        display=""
        justifyC=""
        alignI=""
        width="5%"
        height="100%"
        backcolor="transparent"
        borderR="0px"
        onClick={handleOpen}
      >
        {/* 아래 부분이 모달을 열기 위한 버튼 */}
        <Img src={LeftArrow} width="100%" height="100%" />
      </Button>
      {/* 모달 컴포넌트 */}
      <ModalBody2
        useState_open={open}
        set_open={setOpen}
        modal_title="어느 쪽이 많을까요?"
        modal_content={
          <BalanceResult
            news={props.news}
            countOfLeftAnswer={props.countOfLeftAnswer}
            countOfRightAnswer={props.countOfRightAnswer}
          />
        }
        modal_btn1="닫기"
        modal_btn2=""
        btn_justify="space-around"
      />
    </>
  );
}

export default IntoBalanceResult;
