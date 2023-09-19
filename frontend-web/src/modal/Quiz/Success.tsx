import React from "react";
import styled from "styled-components";

const Container = styled.div`
    /* 로고 이미지 스타일 설정 */
    width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
    height: 100vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
    display: flex;
    flex-direction: column;
    border: solid;
    box-sizing: border-box;
    padding: 10% 10%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 40%;
  border: solid;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 30%;
  border: solid;
  box-sizing: border-box;
`;

function Success() {
  return (
    <Container>
        <ImageContainer>
        </ImageContainer>
        <TextContainer>
        </TextContainer>
    </Container>
  );
}

export default Success;
