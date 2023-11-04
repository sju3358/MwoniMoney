import * as React from "react";
import styled from "styled-components";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";
import Childeyes from "../../../assests/image/main/Childeyes.png";
import RegistChild from "../../../modal/ChildCreate";
import { ModalBody3 } from "../../../modal/ModalImg";
import AddChildImg from "../../../assests/image/main/Addchild.png";
import Button from "../About/AboutButton";

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
  &:active {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    transform: translate(0em, 0.2em);
  }
`;

interface ChildCardProps {
  childName: string;
  onClick: () => void;
}

function AddChild() {
  const [open, setOpen] = React.useState(false);
  console.log(open + "33");
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
    console.log(open + "111");
  };
  return (
    <>
      <Button
        display=""
        justifyC=""
        alignI=""
        width="90%"
        height="90%"
        backcolor="transparent"
        borderR="0px"
        margin="3% 0% 0% 0%"
        onClick={handleOpen}
      >
        <EmogiBox backImg={AddChildImg} width="100%" height="100%" />
      </Button>
      <ModalBody3
        useState_open={open}
        set_open={setOpen}
        modal_title="자녀 등록하기"
        modal_content={<RegistChild />}
        modal_btn1="생성"
        modal_btn2="취소"
        btn_justify="space-around"
      />
    </>
    // </Child>
  );
}

function ChildCard({ childName, onClick }: ChildCardProps) {
  // 클릭 이벤트 핸들러
  const handleClick = () => {
    onClick();
  };
  return (
    <Child onClick={handleClick}>
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
        {childName}
      </Container>
    </Child>
  );
}

export { ChildCard, AddChild };
