import React from "react";
import styled from "styled-components";

const Background = styled.div`
  /* �ΰ� �̹��� ��Ÿ�� ���� */
  width: 100vw; /* ȭ�� �ʺ� �°� �����̳� ũ�� ���� */
  height: 100vh; /* ȭ�� ���̿� �°� �����̳� ũ�� ���� */
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage1/background5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat; /* �̹��� �ݺ� ���� */
`;

const LogoBox = styled.div`
  width: 100vw; /* ȭ�� �ʺ� �°� �����̳� ũ�� ���� */
  height: 80vh; /* ȭ�� ���̿� �°� �����̳� ũ�� ���� */
  // border: 1px solid black;
`;
const ButtonBox = styled.div`
  width: 100vw; /* ȭ�� �ʺ� �°� �����̳� ũ�� ���� */
  height: 20vh; /* ȭ�� ���̿� �°� �����̳� ũ�� ���� */
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.div`
  // border:1px solid  black;
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 80%; /* ���� �ʺ� ȭ�� �ʺ��� 41.11%�� ���� */
  height: 30%; /* ���̸� ȭ�� ������ 6.41%�� ���� */
  // background-color :green;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/start.png);
  background-size: 100% 100%;
`;

function MyComponent() {
  return (
    <Background>
      <LogoBox></LogoBox>
      <ButtonBox>
        <StartButton />
      </ButtonBox>
    </Background>
  );
}

export default MyComponent;
