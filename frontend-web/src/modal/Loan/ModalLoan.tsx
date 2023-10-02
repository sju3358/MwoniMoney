/**이미지 클릭 모달/!!!!! */
import * as React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

//recoil
import { useRecoilState } from "recoil";
import { newLoan } from "../../states/LoanState";
import { isProposeLoan } from "../../states/LoanState";

//axios
import api from "../../apis/Api";

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
}
/**모달 닫기 버튼 */
export const ModalBtn = styled.div<Btn>`
  // border: 1px solid black;
  width: 40%;
  height: 80%;
  background-color: ${(props) =>
    props.back_color ? props.back_color : "#fbd570"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalProps {
  modal_title: string;
  modal_content: React.ReactNode;
  modal_btn1: string;
  modal_btn2: string;
  content_justify?: string;
  content_align?: string;
  btn_justify?: string;
  useState_open: boolean;
  set_open: (val: boolean) => void;
}

const ModalLoan: React.FC<ModalProps> = ({
  modal_title,
  modal_content,
  modal_btn1,
  modal_btn2,
  content_justify,
  content_align,
  useState_open,
  set_open,
}) => {
  console.log(useState_open + "455654");
  console.log(useState_open);

  /**
   * 제출
   */
  const [newLoanData, setNewLoanData] = useRecoilState(newLoan);
  const [isProposeState, setisProposeState] = useRecoilState(isProposeLoan);

  const handleSubmit = () => {
    if (newLoanData.title.length < 1) {
      alert("대출명이 없습니다.");
      return;
    }
    if (newLoanData.memo.length < 1) {
      alert("내용이 없습니다.");
      return;
    }
    if (newLoanData.debt < 100) {
      alert("100원보다 크게 설정해주세요");
      return;
    }
    if (newLoanData.endTime.length < 1) {
      alert("마감기한이 없습니다.");
      return;
    }
    if (newLoanData.everykey.length < 1) {
      alert("매달, 매주를 선택해주세요");
      return;
    }
    if (newLoanData.everyvalue.length < 1) {
      alert("날을 선택해주세요");
      return;
    }
    if (newLoanData.rate < 0.1) {
      alert("대출금리를 0.1보다 크게 선택해주세요");
      return;
    }

    // NewLoanData에 uuid랑 status설정하기
    const PostData = {
      childUuid: "none",
      title: newLoanData.title,
      memo: newLoanData.memo,
      debt: newLoanData.debt,
      endTime: new Date(newLoanData.endTime).toISOString(),
      everykey: newLoanData.everykey,
      everyvalue: newLoanData.everyvalue,
      rate: newLoanData.rate,
      status: 0,
    };
    console.log(PostData);

    api
      .post("", PostData)
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("POST 요청 성공:", response.data);
        set_open(false);
        console.log("onclick_Close");
        handleClearNewLoan();
        setisProposeState(true);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        if (error.response) {
          // 서버에서 응답이 왔지만, 응답 상태 코드가 실패인 경우
          console.error("POST 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          // 서버로 요청을 보내지 못한 경우
          console.error("POST 요청 실패 - 요청을 보낼 수 없음");
        } else {
          // 요청 준비 과정에서 에러가 발생한 경우
          console.error("POST 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
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
    setNewLoanData({
      childUuid: "",
      title: "",
      memo: "",
      debt: 0,
      endTime: "",
      everykey: "",
      everyvalue: "",
      rate: 0,
      status: 0,
    });
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
          <ModalContent justify={content_justify} align={content_align}>
            {modal_content}
          </ModalContent>
          <ModalTopBottom justify="space-around">
            <ModalBtn onClick={handleSubmit}>{modal_btn1}</ModalBtn>
            <ModalBtn back_color="#f5f3ed" onClick={handleClose}>
              {modal_btn2}
            </ModalBtn>
          </ModalTopBottom>
        </ModalBack>
      </ModalContainer>
    </Modal>
  );
};

export default ModalLoan;