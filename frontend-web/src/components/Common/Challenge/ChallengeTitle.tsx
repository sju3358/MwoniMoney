import React from "react";
import styled from "styled-components";
import { Emoji } from "../Main/MainStyle";
import Vitory from "../../../assests/image/Victory.png";
/**
 * recoil
 */
import { userDataState } from "../../../states/UserInfoState";
import { useRecoilState } from "recoil";

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
  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;

  let nickname: string | null = null;
  const childStateString: string | null = localStorage.getItem("childState");

  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    nickname = childState.childDataState.nickname;
    console.log(nickname);
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  return (
    <TitleContainer>
      {role === "PARENT" ? (
        <TitleBox width="70%">{nickname}의 챌린지</TitleBox>
      ) : (
        <TitleBox width="70%">나의 챌린지</TitleBox>
      )}

      <TitleBox width="30%">
        <Emoji url={`${Vitory}`} width="60%" height="60%" />
      </TitleBox>
    </TitleContainer>
  );
}

export default ChallengeTitle;
