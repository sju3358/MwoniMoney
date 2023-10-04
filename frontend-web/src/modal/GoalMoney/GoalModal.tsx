import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Container } from "../../components/Common/About/AboutContainer";
import { TextBox } from "../../components/Common/About/AboutText";
import { WhiteBox1 } from "../../components/Common/About/AboutWhilteContainer";
import { ModalBtn } from "../ModalBtn1";
import { useRecoilState } from "recoil";
import { ModalState } from "../../states/ModalState";
import { GoalImgCheckState, GoalMoneyState } from "../../states/GoalMoneyState";

interface GoalModalProps {
  goalModal_open: boolean;
}

function GoalModal(props: GoalModalProps) {
  const { goalModal_open } = props;
  const [open, setOpen] = useRecoilState(ModalState);
  const [goal, setGoal] = useRecoilState(GoalMoneyState);
  const [goalImg, setgoalImg] = useRecoilState(GoalImgCheckState);
  const [img, setImg] = useState("");

  const handleChange = (e: any) => {
    setImg(e.target.files[0]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setGoal((goal: any) => ({
      ...goal,
      image: img,
    }));
    setgoalImg((res: any) => ({
      ...res,
      ImgCheck: true,
    }));
    setOpen(false);
  };

  return (
    <Modal
      open={goalModal_open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        height="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <WhiteBox1 height="30%" width="85%" flexDirection="column">
          <Container height="30%">
            <TextBox>이미지 저장</TextBox>
          </Container>
          <Container
            height="50%"
            flexDirection="column"
            justifyContent="center"
            align="center"
          >
            <input type="file" accept="image/*" onChange={handleChange} />
          </Container>
          <Container height="20%" justifyContent="space-around">
            <ModalBtn modalBtn_width="35%" onClick={handleSave}>
              저장
            </ModalBtn>
            <ModalBtn
              modalBtn_color="gray"
              modalBtn_width="35%"
              onClick={handleClose}
            >
              취소
            </ModalBtn>
          </Container>
        </WhiteBox1>
      </Container>
    </Modal>
  );
}

export default GoalModal;
