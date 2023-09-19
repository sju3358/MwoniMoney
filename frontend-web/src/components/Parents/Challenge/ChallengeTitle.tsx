import React from "react";
import styled from "styled-components";
import { Emoji } from "../Main";
import Vitory from "../../../assests/image/Victory.png";

const TitleContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  font-size: 1.7em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TitleProps {
  width: string;
}

const TitleBox = styled.div<TitleProps>`
  // border: 1px solid black;
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChallengeTitle() {
  const child = "재이"; // axios 연결하면 자녀 이름
  return (
    <TitleContainer>
      <TitleBox width="70%">{child}의 챌린지</TitleBox>
      <TitleBox width="30%">
        <Emoji url={`${Vitory}`} width="60%" height="60%" />
      </TitleBox>
    </TitleContainer>
  );
}

export default ChallengeTitle;
