import React from "react";
import { MainContainer } from "../components/Parents/Main";
import ChallengeTitle from "../components/Parents/Challenge/ChallengeTitle";
import ChallengeCategory from "../components/Parents/Challenge/ChallengeCategory";
import ChallengeAdd from "../components/Parents/Challenge/ChallengeAdd";
import ChallengeList, {
  ChallengeListContainer,
} from "../components/Parents/Challenge/ChallengeList";

function Challenge() {
  return (
    <MainContainer>
      <ChallengeTitle />
      <ChallengeCategory />
      <ChallengeAdd />
      <ChallengeListContainer>
        <ChallengeList />
        <ChallengeList />
        <ChallengeList />
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
