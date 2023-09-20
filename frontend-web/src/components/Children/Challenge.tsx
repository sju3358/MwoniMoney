import React from "react";
import styled from "styled-components";
import { MainContainer } from "../../components/Parents/Main";
import ChallengeList, {
  ChallengeListContainer,
} from "../../components/Parents/Challenge/ChallengeList";
import { Text } from "../Common/AboutText";

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
