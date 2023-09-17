import React from "react";
import styled from "styled-components";

// ��Ÿ�� ������Ʈ ����
const Container = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage/background.jpg);
  background-size: cover; /* �̹��� ũ�⸦ Android Small�� �°� ���� */
  width: 360px; /* Android Small�� ���� �ʺ� ���� */
  height: 640px; /* Android Small�� ���� ���� */
  /* �ٸ� ��Ÿ�� �Ӽ� �߰� ���� */
`;



function MyComponent() {
  return (
    <Container>
      asdf
    </Container>
  );
}

export default MyComponent;
