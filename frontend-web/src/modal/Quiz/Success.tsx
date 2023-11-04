import * as React from "react";
import ModalBody from "../ModalBtn1";
import styled from "styled-components";
import { EmogiBox } from "../../components/Common/About/AboutEmogi";
import Success from "../../assests/image/Success.png";

const ModalContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  // border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const BigText = styled.div`
  color: var(--text-color-active, #292929);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

function Main() {
  return (
    <ModalContainer>
      <Container height="60%">
        <ContentContainer>
          <EmogiBox backImg={Success} width="50%" height="100%" />
        </ContentContainer>
      </Container>
      <Container height="40%">
        <BigText>5문제 중에 4문제나 맞혔어요!</BigText>
        <div style={{ marginTop: "10px" }}>
          {/* 여백을 추가하기 위해 marginTop을 사용 */}
        </div>
      </Container>
    </ModalContainer>
  );
}

export default function BasicModal() {
  return (
    <div>
      <ModalBody
        modal_start_text="모달띄우는 버튼에 적을 말"
        modal_title=""
        modal_content={<Main />}
        modal_btn="보상받기"
      />
    </div>
  );
}
