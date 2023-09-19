import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* �ΰ� �̹��� ��Ÿ�� ���� */
  width: 61.67%; /* ���� �ʺ� ȭ�� �ʺ��� 61.67%�� ���� */
  height: 30.44%; /* ���̸� ȭ�� ������ 28.44%�� ���� */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: 100% 100%;
  position: absolute;
  left: 19.31vw; /* �������� 19.31%��ŭ �̵� */
  top: 24.13vh; /* ���� 28.13%��ŭ �̵� */
`;

const KaKaoLogin = styled.div`
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 84.72vw; /* ���� �ʺ� ȭ�� �ʺ��� 84.72%�� ���� */
  height: 7.81vh; /* ���̸� ȭ�� ������ 7.81%�� ���� */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw; /* �������� 7.78%��ŭ �̵� */
  top: 59.38vh; /* ���� 59.38%��ŭ �̵� */
`;

const GoogleLogin = styled.div`
  /* ���� �α��� �̹��� ��Ÿ�� ���� */
  width: 84.72vw; /* ���� �ʺ� ȭ�� �ʺ��� 84.72%�� ���� */
  height: 7.81vh; /* ���̸� ȭ�� ������ 7.81%�� ���� */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw; /* �������� 7.78%��ŭ �̵� */
  top: 70.19vh; /* ���� 67.19%��ŭ �̵� */
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
