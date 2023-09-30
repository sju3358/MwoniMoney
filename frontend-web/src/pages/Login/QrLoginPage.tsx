import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* ??? ????? ????? ???? */
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
  /* ???? ?α??? ????? ????? ???? */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 59.38%;
  cursor: pointer; /* Ŀ???? ??????? ??????? ??? ??????? ?? */
`;

const GoogleLogin = styled.div`
  /* ???? ?α??? ????? ????? ???? */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 70.19%;
  cursor: pointer; /* Ŀ???? ??????? ??????? ??? ??????? ?? */
`;

function QrLoginPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 특정 query parameter 값 읽기
  const paramValue = queryParams.get("parentuuid");
  console.log(paramValue);
  const valueToStore = paramValue || ""; // null인 경우 빈 문자열로 설정
  localStorage.setItem("parentuuid", valueToStore);

  const handleKaKaoLoginClick = () => {
    // ?????? ???? ?α??? ????? ???????? ????? ?????? ?????? ?? ????
    console.log("KaKaoLogin ?????");

    // kakaoURL?? ???? ???
    const socialName = "kakao"; // ??? ???? ???
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/QrLoginRedirect`;
    console.log("Kakao URL ???: " + kakaoURL);

    // ?????? ?????
    window.location.href = kakaoURL;
  };

  const handleGoogleLoginClick = () => {
    // ?????? ???? ?α??? ????? ???????? ????? ?????? ?????? ?? ????
    console.log("GoogleLogin ?????");
    const socialName = "google"; // ??? ???? ???
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/QrLoginRedirect`;
    console.log("Kakao URL ???: " + kakaoURL);

    // ?????? ?????
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Logo />
      <KaKaoLogin onClick={handleKaKaoLoginClick} />
      <GoogleLogin onClick={handleGoogleLoginClick} />
    </Container>
  );
}

export default QrLoginPage;
