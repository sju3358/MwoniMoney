import * as React from "react";
import ModalBody from "../ModalBtn1";
import styled from "styled-components";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상 설정 */
  font-size: 24px; /* 텍스트 크기 설정 */
`;

const BigText = styled.div`
  color: var(--text-color-active, #292929);

  /* content/title/mid */
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

function NewsContent(props: any) {
  // props.news를 이용하여 원하는 내용을 표시합니다.
  return (
    <ModalContainer>
      <Container height="60%">
        <ContentContainer>
          <BigText>{props.news}</BigText>
        </ContentContainer>
      </Container>
    </ModalContainer>
  );
}

export default function News(props: any) {
  return (
    <ModalBody
      modal_text_color="white"
      modal_start_text="Click"
      modal_title="뉴스"
      modal_content={<NewsContent news={props.news} />}
      modal_btn="닫기"
    />
  );
}
