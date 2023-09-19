import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 61.67%; /* 가로 너비를 화면 너비의 61.67%로 설정 */
  height: 30.44%; /* 높이를 화면 높이의 28.44%로 설정 */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: 100% 100%;
  position: absolute;
  left: 19.31vw; /* 왼쪽으로 19.31%만큼 이동 */
  top: 24.13vh; /* 위로 28.13%만큼 이동 */
`;

const KaKaoLogin = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 84.72vw; /* 가로 너비를 화면 너비의 84.72%로 설정 */
  height: 7.81vh; /* 높이를 화면 높이의 7.81%로 설정 */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw; /* 왼쪽으로 7.78%만큼 이동 */
  top: 59.38vh; /* 위로 59.38%만큼 이동 */
`;

const GoogleLogin = styled.div`
  /* 구글 로그인 이미지 스타일 설정 */
  width: 84.72vw; /* 가로 너비를 화면 너비의 84.72%로 설정 */
  height: 7.81vh; /* 높이를 화면 높이의 7.81%로 설정 */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw; /* 왼쪽으로 7.78%만큼 이동 */
  top: 70.19vh; /* 위로 67.19%만큼 이동 */
`;

function MyComponent() {
  return (
    <Container>
      <Logo />
      <KaKaoLogin />
      <GoogleLogin />
    </Container>
  );
}

export default MyComponent;
