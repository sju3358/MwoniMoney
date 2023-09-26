import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 61.67%;
  height: 30.44%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: 100% 100%;
  position: absolute;
  left: 19.31vw;
  top: 24.13vh;
`;

const KaKaoLogin = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 59.38%;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하게 함 */
`;

const GoogleLogin = styled.div`
  /* 구글 로그인 이미지 스타일 설정 */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 70.19%;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하게 함 */
`;

function MyComponent() {
  const handleKaKaoLoginClick = () => {
    // 여기에서 카카오 로그인 처리를 수행하거나 필요한 동작을 수행할 수 있음
    console.log("KaKaoLogin 클릭됨");

    // kakaoURL을 콘솔에 출력
    const socialName = "kakao"; // 소셜 미디어 이름
    const redirectURI = "your_redirect_uri"; // 리디렉션 URI를 여기에 추가
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/redirect`;
    console.log("Kakao URL 주소: " + kakaoURL);

    // 페이지 리디렉션
    window.location.href = kakaoURL;
  };

  const handleGoogleLoginClick = () => {
    // 여기에서 구글 로그인 처리를 수행하거나 필요한 동작을 수행할 수 있음
    console.log("GoogleLogin 클릭됨");
  };

  return (
    <Container>
      <Logo />
      <KaKaoLogin onClick={handleKaKaoLoginClick} />
      <GoogleLogin onClick={handleGoogleLoginClick} />
    </Container>
  );
}

export default MyComponent;
