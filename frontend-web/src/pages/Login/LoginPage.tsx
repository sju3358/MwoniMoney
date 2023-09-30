import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* �ΰ� �̹��� ��Ÿ�� ���� */
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
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 59.38%;
  cursor: pointer; /* Ŀ���� �����ͷ� �����Ͽ� Ŭ�� �����ϰ� �� */
`;

const GoogleLogin = styled.div`
  /* ���� �α��� �̹��� ��Ÿ�� ���� */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 70.19%;
  cursor: pointer; /* Ŀ���� �����ͷ� �����Ͽ� Ŭ�� �����ϰ� �� */
`;

function MyComponent() {
  const handleKaKaoLoginClick = () => {
    // ���⿡�� īī�� �α��� ó���� �����ϰų� �ʿ��� ������ ������ �� ����
    console.log("KaKaoLogin Ŭ����");

    // kakaoURL�� �ֿܼ� ���
    const socialName = "kakao"; // �Ҽ� �̵�� �̸�
    const redirectURI = "your_redirect_uri"; // ���𷺼� URI�� ���⿡ �߰�
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/redirect`;
    console.log("Kakao URL �ּ�: " + kakaoURL);

    // ������ ���𷺼�
    window.location.href = kakaoURL;
  };

  const handleGoogleLoginClick = () => {
    // ���⿡�� ���� �α��� ó���� �����ϰų� �ʿ��� ������ ������ �� ����
    console.log("GoogleLogin Ŭ����");
    const socialName = "google"; // �Ҽ� �̵�� �̸�
    const redirectURI = "your_redirect_uri"; // ���𷺼� URI�� ���⿡ �߰�
    const kakaoURL = `${process.env.REACT_APP_SERVER_URL}/api/oauth2/authorization/${socialName}?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/redirect`;
    console.log("Kakao URL �ּ�: " + kakaoURL);

    // ������ ���𷺼�
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

export default MyComponent;
