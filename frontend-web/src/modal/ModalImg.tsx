/**이미지 클릭 모달/!!!!! */
import * as React from "react";
import styled from "styled-components";
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
  font-size: 1.5em;
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
  font-family: TheJamsil5Bold;
  width: 40%;
  height: 80%;
  background-color: ${(props) =>
    props.back_color ? props.back_color : "#fbd570"};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.border ? props.border : "none")};
  &:active {
    background-color: ${(props) =>
      props.af_back_color ? props.af_back_color : props.af_back_color};
    transform: translate(0em, 0.2em);
  }
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

const ModalBody3: React.FC<ModalProps> = ({
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
  const handleClose = () => {
    set_open(false);
    console.log("onclick_Close");
  };
  console.log(useState_open);
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
            <ModalBtn af_back_color="#FFC107" onClick={handleClose}>
              {modal_btn1}
            </ModalBtn>
            <ModalBtn
              back_color="white"
              af_back_color="#BBBBBB"
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

const ModalBody2: React.FC<ModalProps> = ({
  modal_title,
  modal_content,
  modal_btn1,
  content_justify,
  content_align,
  useState_open,
  set_open,
}) => {
  const handleClose = () => {
    set_open(false);
    // console.log("onclick_Close");
  };
  // console.log(useState_open);

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
            <ModalBtn onClick={handleClose}>{modal_btn1}</ModalBtn>
          </ModalTopBottom>
        </ModalBack>
      </ModalContainer>
    </Modal>
  );
};

export { ModalBody2, ModalBody3 };
