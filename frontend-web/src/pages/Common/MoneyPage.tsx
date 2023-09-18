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
  padding: 10%;
`;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  border: solid;
`

const TextBlock = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 20vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 20vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  border: solid;
`;

const TextContainer = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 80vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 20vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  border: solid;
`;

const Text = styled.div`
  width: 100vw;
  height: 33%;
  border: solid;
`;

function MoneyPage() {
  return (
    <Container>
        <HeaderContainer></HeaderContainer>
        <TextContainer>
          <Text>asdf</Text>
          <Text>asdf</Text>
        </TextContainer>
        <Footer/>
    </Container>
  );
}

export default MoneyPage;
