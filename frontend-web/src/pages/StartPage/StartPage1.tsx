import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트 생성
const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/background.jpg);
  background-size: cover; /* 이미지 크기를 Android Small에 맞게 조정 */
  width: 360px; /* Android Small의 가로 너비 설정 */
  height: 640px; /* Android Small의 높이 설정 */
  /* 다른 스타일 속성 추가 가능 */
`;



function MyComponent() {
  return (
    <Container>
      asdf
    </Container>
  );
}

export default MyComponent;
