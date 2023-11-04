/**생성/취소 버튼 있는 모달!!!!! */

import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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
  modal_start_text: string;
  modal_title: string;
  modal_content: React.ReactNode;
  modal_btn1: string;
  modal_btn2: string;
  content_justify?: string;
  content_align?: string;
  btn_justify?: string;
}

const ModalBody1: React.FC<ModalProps> = ({
  modal_start_text,
  modal_title,
  modal_content,
  modal_btn1,
  modal_btn2,
  content_justify,
  content_align,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>{modal_start_text}</Button>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <ModalBack>
            <ModalTopBottom>{modal_title}</ModalTopBottom>
            <ModalContent justify={content_justify} align={content_align}>
              {modal_content}
            </ModalContent>
            <ModalTopBottom justify="space-around">
              <ModalBtn onClick={handleClose}>{modal_btn1}</ModalBtn>
              <ModalBtn back_color="#f5f3ed" onClick={handleClose}>
                {modal_btn2}
              </ModalBtn>
            </ModalTopBottom>
          </ModalBack>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ModalBody1;
