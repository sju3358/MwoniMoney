import React from "react";
import styled from "styled-components";
import { MainContainer } from "../Common/Main/MainStyle";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import { Text } from "../Common/About/AboutText";

/**
 *
 * ChallengeHeader
 */
const TextBox = styled.div``;

function Challenge() {
  return (
    <MainContainer>
      <TextBox>
        <Text fontweight="700" padding="5%">
          챌린지
        </Text>
        <Text fontsize="0.625rem" color="#747476" padding="0% 0% 0% 5%">
          현재 진행중인 챌린지에요!
        </Text>
      </TextBox>
      <ChallengeListContainer>
        <ChallengeList />
        <ChallengeList />
        <ChallengeList />
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
