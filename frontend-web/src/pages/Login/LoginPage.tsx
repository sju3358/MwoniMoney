import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const Logo = styled.div`
  // border: 1px solid blue;
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
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 59.38%;
  cursor: pointer;
`;

const GoogleLogin = styled.div`
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 70.19%;
  cursor: pointer;
`;

function MyComponent() {
  //memberRole을 확인

  const handleKaKaoLoginClick = () => {
    console.log("KaKaoLogin 로그인");
    // kakaoURL
    const socialName = "kakao";
    const redirectURI = "your_redirect_uri";
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/redirect`;
    console.log("Kakao URL 주소: " + kakaoURL);

    window.location.href = kakaoURL;
  };

  const handleGoogleLoginClick = () => {
    console.log("GoogleLogin 로그인");
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
