import React from "react";
import styled from "styled-components";
import { Container } from "../../../components/Common/About/AboutContainer";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage1/background1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const Skip = styled.div`
  width: 17.78vw;
  height: 3.75vh;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/Skip.png);
  background-size: 100% 100%;
  position: absolute;
  left: 74.72vw;
  top: 6.56vh;
`;

interface StartBtnProps {
  backC?: string | undefined;
}

const StartBtn = styled.div<StartBtnProps>`
  border: 1px solid black;
  width: 40%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.backC ? props.backC : "#ffffff")};
  font-weight: bolder;
`;

function MyComponent() {
  return (
    <Background>
      <Container height="15%">
        <Skip />
      </Container>
      <Container height="70%" />
      <Container height="15%" justifyContent="space-around" align="center">
        <StartBtn>이전</StartBtn>
        <StartBtn backC="#fbd56e">다음</StartBtn>
      </Container>
    </Background>
  );
}

export default MyComponent;
