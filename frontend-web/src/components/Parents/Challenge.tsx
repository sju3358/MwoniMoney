import React from "react";
import ChallengeAdd from "../Common/Challenge/ChallengeAdd";
import ChallengeCategory from "../Common/Challenge/ChallengeCategory";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import ChallengeTitle from "../Common/Challenge/ChallengeTitle";
import { MainContainer } from "../Common/Main/Main";

function Challenge() {
  return (
    <MainContainer>
      <ChallengeTitle />
      <ChallengeCategory />
      <ChallengeAdd />
      <ChallengeListContainer>
        {/* <ChallengeList />
        <ChallengeList />
        <ChallengeList /> */}
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
