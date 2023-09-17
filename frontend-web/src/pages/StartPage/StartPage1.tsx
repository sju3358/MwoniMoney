import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 222px;
  height: 163px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: cover;
  
  /* 로고의 위치 조정 */
  position: absolute;
  left: 69.5px; /* 왼쪽으로 69.5px만큼 이동 */
  top: 180px; /* 위로 180px만큼 이동 */

  /* 다른 스타일 속성 추가 가능 */
`;

const KaKaoLogin = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 305px;
  height: 50px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: cover;
  font-family: 'Nanum Gothic', sans-serif; /* 한글 폰트 설정 */

  /* 로고의 위치 조정 */
  position: absolute;
  left: 28px; /* 왼쪽으로 69.5px만큼 이동 */
  top: 380px; /* 위로 180px만큼 이동 */
`;

const GoogleLogin = styled.div`
  /* 구글 로그인 이미지 스타일 설정 */
  width: 305px;
  height: 50px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: cover;

  /* 로고의 위치 조정 */
  position: absolute;
  left: 28px; /* 왼쪽으로 69.5px만큼 이동 */
  top: 440px; /* 위로 180px만큼 이동 */
`;  

function MyComponent() {
  return (
    <div>
      <Logo></Logo>
      <KaKaoLogin></KaKaoLogin>
      <GoogleLogin></GoogleLogin>
    </div>
  );
}

export default MyComponent;
