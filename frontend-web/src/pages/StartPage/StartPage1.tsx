import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  /* �ΰ� �̹��� ��Ÿ�� ���� */
  width: 222px;
  height: 163px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: cover;
  
  /* �ΰ��� ��ġ ���� */
  position: absolute;
  left: 69.5px; /* �������� 69.5px��ŭ �̵� */
  top: 180px; /* ���� 180px��ŭ �̵� */

  /* �ٸ� ��Ÿ�� �Ӽ� �߰� ���� */
`;

const KaKaoLogin = styled.div`
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 305px;
  height: 50px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: cover;
  font-family: 'Nanum Gothic', sans-serif; /* �ѱ� ��Ʈ ���� */

  /* �ΰ��� ��ġ ���� */
  position: absolute;
  left: 28px; /* �������� 69.5px��ŭ �̵� */
  top: 380px; /* ���� 180px��ŭ �̵� */
`;

const GoogleLogin = styled.div`
  /* ���� �α��� �̹��� ��Ÿ�� ���� */
  width: 305px;
  height: 50px;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: cover;

  /* �ΰ��� ��ġ ���� */
  position: absolute;
  left: 28px; /* �������� 69.5px��ŭ �̵� */
  top: 440px; /* ���� 180px��ŭ �̵� */
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
