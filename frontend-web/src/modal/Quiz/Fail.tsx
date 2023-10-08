import * as React from "react";
import ModalBody from "../ModalBtn1";
import styled from "styled-components";
import { EmogiBox } from "../../components/Common/About/AboutEmogi";
import Fire from "../../assests/image/Fire.png";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  margin: 10px 0; /* 여백을 추가하려면 여기에서 조절하세요 */
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상 설정 */
  font-size: 24px; /* 텍스트 크기 설정 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 텍스트 그림자 추가 */
`;

const ContentContainer1 = styled.div`
  margin: 10px 0; /* 여백을 추가하려면 여기에서 조절하세요 */
  background-image: url(${Fire}); /* Success 이미지 경로 설정 */
  background-size: cover; /* 이미지를 컨테이너에 맞게 확대 또는 축소 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center center; /* 이미지를 가운데 정렬 */
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상 설정 */
  font-size: 24px; /* 텍스트 크기 설정 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 텍스트 그림자 추가 */
`;

const BigText = styled.div`
  color: var(--text-color-active, #292929);

  /* content/title/mid */
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
          <EmogiBox backImg={Fire} width="50%" height="100%"></EmogiBox>
        </ContentContainer>
      </Container>
      <Container height="40%">
        <BigText>5문제 중에 1문제밖에...</BigText>
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
        modal_btn="닫기"
        color_btn="#F4F4F4"
      />
    </div>
  );
}
