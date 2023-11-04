import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage1/background5.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const LogoBox = styled.div`
  // border: 1px solid black;
  width: 100vw;
  height: 80vh;
`;
const ButtonBox = styled.div`
  // border: 1px solid black;
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.div`
  // border:1px solid  black;
  width: 80%;
  height: 30%;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/start.png);
  background-size: 100% 100%;
`;

function MyComponent() {
  return (
    <Background>
      <LogoBox />
      <ButtonBox>
        <StartButton />
      </ButtonBox>
    </Background>
  );
}

export default MyComponent;
