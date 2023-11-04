import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage1/background4.png);
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

const Prev = styled.div`
  width: 41.11vw;
  height: 6.41vh;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/prev.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78vw;
  top: 87.5vh;
`;

const Next = styled.div`
  width: 41.11vw;
  height: 6.41vh;
  background-image: url(${process.env.PUBLIC_URL}/images/StartPage1/next.png);
  background-size: cover;
  position: absolute;
  left: 50vw;
  top: 87.5vh;
`;

function MyComponent() {
  return (
    <Background>
      <Skip />
      <Prev />
      <Next />
    </Background>
  );
}

export default MyComponent;
