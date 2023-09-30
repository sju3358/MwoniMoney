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
  // transform: translate(-50%, 50%);
  width: 80%;
  height: ${(props) => (props.height ? props.height : "50%")};
  background-color: #ffffff;
  padding: 4px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;

/**모달 헤더, 푸터 기능 */
export const ModalTopBottom = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
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
  border: 1px solid black;
  padding-top:3%
  width: 100%;
  height: 70%;
  overflow: auto;
  display: flex;
  justify-content:${(props) => (props.justify ? props.justify : "center")};
  align-items:${(props) => (props.align ? props.align : "center")};
`;

interface ModalBtnProps {
  modalBtn_color?: string;
  modalBtn_width?: string | undefined;
  modalBtn_height?: string | undefined;
}

/**모달 닫기 버튼 */
export const ModalBtn = styled.div<ModalBtnProps>`
  // border: 1px solid black;
  width: ${(props) => (props.modalBtn_width ? props.modalBtn_width : "60%")};
  height: ${(props) => (props.modalBtn_height ? props.modalBtn_height : "80%")};
  background-color: ${(props) =>
    props.modalBtn_color ? props.modalBtn_color : "#fbd570"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalProps {
  modal_start_text: string;
  modal_title: string;
  modal_content: any;
  modal_btn: string;
  content_justify?: string;
  content_align?: string;
  color_btn?: string;
  modal_text_color?: string;
}

const ModalBody: React.FC<ModalProps> = ({
  modal_text_color,
  modal_start_text,
  modal_title,
  modal_content,
  modal_btn,
  content_justify,
  content_align,
  color_btn,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  console.log(open);
  return (
    <>
      <Button style={{ color: `${modal_text_color}` }} onClick={handleOpen}>
        {modal_start_text}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <ModalBack>
            <ModalTopBottom>{modal_title}</ModalTopBottom>
            <ModalContent justify={content_justify} align={content_align}>
              {modal_content}
            </ModalContent>
            <ModalTopBottom>
              <ModalBtn
                onClick={() => {
                  handleClose();
                }}
                color={color_btn}
              >
                {modal_btn}
              </ModalBtn>
            </ModalTopBottom>
          </ModalBack>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ModalBody;
