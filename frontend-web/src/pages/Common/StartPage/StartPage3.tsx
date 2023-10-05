import React from "react";
import styled from "styled-components";

const Background = styled.div`
  /* �ΰ� �̹��� ��Ÿ�� ���� */
  width: 100vw; /* ȭ�� �ʺ� �°� �����̳� ũ�� ���� */
  height: 100vh; /* ȭ�� ���̿� �°� �����̳� ũ�� ���� */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/background3.png);
  background-size: 100% 100%;
  background-repeat: no-repeat; /* �̹��� �ݺ� ���� */
`;

const Skip = styled.div`
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 17.78vw; /* ���� �ʺ� ȭ�� �ʺ��� 17.78%�� ���� */
  height: 3.75vh; /* ���̸� ȭ�� ������ 3.75%�� ���� */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/Skip.png);
  background-size: 100% 100%;
  position: absolute;
  left: 74.72vw; /* �������� 74.72%��ŭ �̵� */
  top: 6.56vh; /* ���� 6.56%��ŭ �̵� */
`;

const Prev = styled.div`
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 41.11vw; /* ���� �ʺ� ȭ�� �ʺ��� 41.11%�� ���� */
  height: 6.41vh; /* ���̸� ȭ�� ������ 6.41%�� ���� */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/prev.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw; /* �������� 7.78%��ŭ �̵� */
  top: 87.5vh; /* ���� 87.5%��ŭ �̵� */
`;

const Next = styled.div`
  /* īī�� �α��� �̹��� ��Ÿ�� ���� */
  width: 41.11vw; /* ���� �ʺ� ȭ�� �ʺ��� 41.11%�� ���� */
  height: 6.41vh; /* ���̸� ȭ�� ������ 6.41%�� ���� */
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/next.png);
  background-size: cover;
  position: absolute;
  left: 50vw; /* �������� 50%��ŭ �̵� */
  top: 87.5vh; /* ���� 87.5%��ŭ �̵� */
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
