import React from "react";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import { Container } from "../Common/About/AboutContainer";
import { TextBox } from "../Common/About/AboutText";

/**
 *
 * ChallengeHeader
 */

function Challenge() {
  return (
    <Container height="100%" flexDirection="column">
      <Container height="12%">
        <TextBox height="100%">챌린지</TextBox>
      </Container>
      <Container height="5%" />
      <Container height="83%">
        <Container height="100%" flexDirection="column" overflowy="auto">
          <ChallengeList />
          <ChallengeList />
          <ChallengeList />
        </Container>
      </Container>
      {/* <TextBox fontsize="0.7rem" color="#747476" padding="0% 0% 0% 5%">
        현재 진행중인 챌린지에요!
      </TextBox> */}
    </Container>
  );
}

export default Challenge;
