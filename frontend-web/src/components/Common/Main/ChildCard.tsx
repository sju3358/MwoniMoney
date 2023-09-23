import * as React from "react";
import styled from "styled-components";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";
import Childeyes from "../../../assests/image/main/Childeyes.png";
import RegistChild from "../../../modal/ChildCreate";
import ModalBody3 from "../../../modal/ModalImg";
import AddChildImg from "../../../assests/image/main/Addchild.png";

interface ChildProps {
  flex?: string | undefined;
  justify?: string | undefined;
  align?: string | undefined;
  backC?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  line?: string | undefined;
}

export const Child = styled.div<ChildProps>`
  width: ${(props) => (props.width ? props.width : "75%")};
  height: ${(props) => (props.height ? props.height : "90%")};
  border: ${(props) => (props.line ? props.line : "1px solid #fdeab7")};
  border-radius: 7px;
  background-color: ${(props) => (props.backC ? props.backC : "#fffaed;")};
  box-sizing: border-box;
  display: ${(props) => props.flex};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

function AddChild() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    // <Child flex="flex" justify="center" align="center" backC="none" line="none">
    <EmogiBox
      style={{ marginTop: "3%" }}
      width="75%"
      height="91%"
      backImg={`${AddChildImg}`}
      onClick={handleOpen}
    >
      <ModalBody3
        modal_title="자녀 등록하기"
        modal_content={<RegistChild />} /**테그 넣는 방법*/
        modal_btn1="생성"
        modal_btn2="취소"
        btn_justify="space-around"
      />
    </EmogiBox>
    // </Child>
  );
}

function ChildCard() {
  return (
    <Child>
      <Container width="100%" height="65%">
        <Container width="80%" height="90%" radius="50%" backcolor="#fcdf92">
          <EmogiBox width="70%" height="70%" backImg={Childeyes} />
        </Container>
      </Container>
      <Container
        width="100%"
        height="35%"
        color="#fcdf92"
        fontw="bold"
        fonts="1.2em"
      >
        딸
      </Container>
    </Child>
  );
}

export { ChildCard, AddChild };
