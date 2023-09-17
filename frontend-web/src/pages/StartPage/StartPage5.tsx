import React from "react";
import styled from "styled-components";

const Background = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 100vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/background5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 이미지 반복 제거 */
`;

const LogoBox = styled.div`
width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
height: 80vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
// border: 1px solid black;
`
const ButtonBox = styled.div`
width: 100vw; /* 화면 너비에 맞게 컨테이너 크기 설정 */
height: 20vh; /* 화면 높이에 맞게 컨테이너 크기 설정 */
// border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;
`

const StartButton = styled.div`
// border:1px solid  black;
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 80%; /* 가로 너비를 화면 너비의 41.11%로 설정 */
  height: 30%; /* 높이를 화면 높이의 6.41%로 설정 */
  // background-color :green;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/start.png);
  background-size: 100% 100%;
  // font-family: 'Nanum Gothic', sans-serif; /* 한글 폰트 설정 */


`;

function MyComponent() {
  return (
    <Background>
       <LogoBox></LogoBox>
       <ButtonBox>
        <StartButton/>
       </ButtonBox>
    </Background>
  );
}

export default MyComponent;
