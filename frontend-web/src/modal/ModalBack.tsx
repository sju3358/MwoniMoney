import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

interface ModalBackPops {
  height?: string;
}
export const ModalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: -5px;
  left: 8px;
`;

export const ModalBack = styled.div<ModalBackPops>`
  position: absolute;
  top: 15%;
  left: 7%;
  // transform: translate(-50%, 50%);
  width: 80%;
  height: ${(props) => (props.height ? props.height : "50%")};
  background-color: #ffffff;
  padding: 4px; /* p 대신 padding을 사용하세요 */
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1); /* box-shadow의 형식이 잘못되었습니다. */
`;

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

export const ModalContent = styled.div`
  // border: 1px solid black;
  padding-top:3%
  width: 100%;
  height: 70%;
  overflow: auto;
`;

export const ModalBtn = styled.div`
  // border: 1px solid black;
  width: 60%;
  height: 80%;
  background-color: #fbd570;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalProps {
  modal_start_text: string;
  modal_title: string;
  modal_content: string;
  modal_btn: string;
}

const ModalBody: React.FC<ModalProps> = ({
  modal_start_text,
  modal_title,
  modal_content,
  modal_btn,
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
      <Button onClick={handleOpen}>{modal_start_text}</Button>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <ModalBack>
            <ModalTopBottom>{modal_title}</ModalTopBottom>
            <ModalContent>{modal_content}</ModalContent>
            <ModalTopBottom>
              <ModalBtn onClick={handleClose}>{modal_btn}</ModalBtn>
            </ModalTopBottom>
          </ModalBack>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ModalBody;
