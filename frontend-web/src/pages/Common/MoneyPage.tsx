import React from "react";
import Footer from "../../components/footer";
import styled from "styled-components";

const Container = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 100vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  display: flex;
  flex-direction: column;
  border: solid;
`;


const BlockContainer = styled.div`
  width: 100vw;
  height: 20vh;
  border: solid;
`;

function MoneyPage() {
  return (
    <Container>
      <BlockContainer>asdf</BlockContainer>

      <BlockContainer>asdf</BlockContainer>
    </Container>
  );
}

export default MoneyPage;
