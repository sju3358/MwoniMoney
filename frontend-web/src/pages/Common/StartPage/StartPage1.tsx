import React from "react";
import styled from "styled-components";

const Background = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 100vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage1/background1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 이미지 반복 제거 */
`;

const Skip = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 17.78vw; /* 가로 너비를 화면 너비의 17.78%로 설정 */
  height: 3.75vh; /* 높이를 화면 높이의 3.75%로 설정 */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/Skip.png);
  background-size: 100% 100%;
  font-family: "Nanum Gothic", sans-serif; /* 한글 폰트 설정 */
  position: absolute;
  left: 74.72vw; /* 왼쪽으로 74.72%만큼 이동 */
  top: 6.56vh; /* 위로 6.56%만큼 이동 */
`;

const Prev = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 41.11vw; /* 가로 너비를 화면 너비의 41.11%로 설정 */
  height: 6.41vh; /* 높이를 화면 높이의 6.41%로 설정 */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/prev.png);
  background-size: 100% 100%;
  font-family: "Nanum Gothic", sans-serif; /* 한글 폰트 설정 */
  position: absolute;
  left: 7.78vw; /* 왼쪽으로 7.78%만큼 이동 */
  top: 87.5vh; /* 위로 87.5%만큼 이동 */
`;

const Next = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 41.11vw; /* 가로 너비를 화면 너비의 41.11%로 설정 */
  height: 6.41vh; /* 높이를 화면 높이의 6.41%로 설정 */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/next.png);
  background-size: cover;
  font-family: "Nanum Gothic", sans-serif; /* 한글 폰트 설정 */
  position: absolute;
  left: 50vw; /* 왼쪽으로 50%만큼 이동 */
  top: 87.5vh; /* 위로 87.5%만큼 이동 */
`;

function MyComponent() {
  return (
    <Background>
      <Skip></Skip>
      <Prev></Prev>
      <Next></Next>
    </Background>
  );
}

export default MyComponent;
