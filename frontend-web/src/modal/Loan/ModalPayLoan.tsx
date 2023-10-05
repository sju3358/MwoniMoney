/**이미지 클릭 모달/!!!!! */
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { Text } from "../../components/Common/About/AboutText";

//recoil
import { useRecoilState } from "recoil";
import { payLoan } from "../../states/LoanState";

import { isRepayLoan } from "../../states/LoanState";

//axios
import api from "../../apis/Api";
import api_ver2 from "../../apis/ApiForMultiPart";

import { moneyFormat } from "../../components/Common/utils";

interface ModalBackPops {
  height?: string;
}

/**모달 위치 고정을 위한 Container */
export const ModalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: -5px;
  left: 8px;
`;

/**실질적 모달 몸통, 높이 커스텀 가능 */
export const ModalBack = styled.div<ModalBackPops>`
  position: absolute;
  top: 15%;
  left: 7%;
  // transform: translate(-50%, 50%);
  width: 80%;
  height: ${(props) => (props.height ? props.height : "50%")};
  background-color: #ffffff;
  padding: 4px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;

interface forBtn {
  justify?: string;
}

/**모달 헤더, 푸터 기능 */
export const ModalTopBottom = styled.div<forBtn>`
  // border: 1px solid black;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: center;
  font-size: 1.3em;
  font-weight: bold;
`;

/**모달 내용 자리 - 테그 함수 들어갈 수 있도록 수정 */
interface ModalContentProps {
  justify?: string;
  align?: string;
}
export const ModalContent = styled.div<ModalContentProps>`
  // border: 1px solid black;
  padding-top:3%
  width: 100%;
  height: 70%;
  overflow: auto;
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
`;
interface Btn {
  back_color?: string;
  af_back_color?: string;
  border?: string;
}
/**모달 닫기 버튼 */
export const ModalBtn = styled.div<Btn>`
  // border: 1px solid black;
  width: 40%;
  height: 80%;
  background-color: ${(props) =>
    props.back_color ? props.back_color : "#fbd570"};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    background-color: ${(props) =>
      props.af_back_color ? props.af_back_color : props.back_color};
    transform: translate(0em, 0.2em);
  }
`;

interface ModalProps {
  loanidx: number;
  balance: number;
  modal_title: string;
  //   modal_content: React.ReactNode;
  modal_btn1: string;
  modal_btn2: string;
  //   content_justify?: string;
  //   content_align?: string;
  btn_justify?: string;
  useState_open: boolean;
  set_open: (val: boolean) => void;
}

export const ContentBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 0%;
`;

export const InputDiv = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputInfo = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  height: 50%;
  font-size: 1.3em;
  outline: none;
`;

const ModalPayLoan: React.FC<ModalProps> = ({
  loanidx,
  balance,
  modal_title,
  //   modal_content,
  modal_btn1,
  modal_btn2,
  //   content_justify,
  //   content_align,
  useState_open,
  set_open,
}) => {
  console.log(useState_open + "455654");
  console.log(useState_open);

  /**
   * 제출
   */
  const [pay, setPay] = useState(0);
  //   const [payLoanData, setpayLoanData] = useRecoilState(payLoan);
  const [isRepayState, setIsRepayState] = useRecoilState(isRepayLoan);

  const handleSubmit = () => {
    if (pay > balance) {
      alert(`대출 잔액보다 더 많이 보내고 있습니다. 잔액은 ${balance}입니다`);
      return;
    }
    const data = JSON.stringify({
      payment: pay,
    });
    console.log(pay);
    console.log(data);
    api_ver2
      .patch(`/v1/loans/repay/${loanidx}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("자식 대출 거절");
        setIsRepayState(true);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });

    // .post("v1/members/small-account", formData, {
    //     // headers: {
    //     // "Contest-Type": "multipart/form-data",
    //     // Authorization: "Bearer " + localStorage.getItem("token"),
    //     // },
    //   })
    //   .then((response) => {
    //     alert("짜금통을 생성했습니다.");
    //     navigate("/GoalMoney");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert("짜금통 생성에 실패했습니다.");
    //   });
    // api
    //   .patch(`/v1/loans/repay/${loanidx}`, { payment: pay })
    //   .then((response) => {
    //     console.log("자식 대출 거절");
    //     setIsRepayState(true);
    //     handleClearNewLoan();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  /**
   * 취소
   */
  const handleClose = () => {
    set_open(false);
    console.log("onclick_Close");
    handleClearNewLoan();
  };

  /**
   * input 초기화
   */
  //NewLoanData 초기화하기
  const handleClearNewLoan = () => {
    setPay(0);
  };

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLoanAmount = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    setPay(newLoanAmount);
  };

  return (
    <Modal
      open={useState_open}
      onClose={() => {
        set_open(false);
      }}
    >
      <ModalContainer>
        <ModalBack>
          <ModalTopBottom>{modal_title}</ModalTopBottom>
          {/* <ModalContent justify={content_justify} align={content_align}>
            {modal_content}
          </ModalContent> */}
          <ContentBox>
            <Text>부모님에게 갚을 돈</Text>
            <InputDiv style={{ flexDirection: "column" }}>
              <InputInfo
                type="number"
                name="payLoanData"
                value={pay}
                placeholder="갚는 돈"
                onChange={handleChangeState}
              ></InputInfo>
            </InputDiv>
            {/* <div>확인용</div>
            <span>{pay}</span> */}
          </ContentBox>
          <ModalTopBottom justify="space-around">
            <ModalBtn af_back_color="#FFC107" onClick={handleSubmit}>
              {modal_btn1}
            </ModalBtn>
            <ModalBtn
              af_back_color="#BBBBBB"
              back_color="white"
              border="1px solid #BBBBBB"
              onClick={handleClose}
            >
              {modal_btn2}
            </ModalBtn>
          </ModalTopBottom>
        </ModalBack>
      </ModalContainer>
    </Modal>
  );
};

export default ModalPayLoan;
