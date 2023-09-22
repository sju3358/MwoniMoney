import React from "react";
import ChallengeParents from "../components/Parents/Challenge";
import ChallengeChild from "../components/Children/Challenge";

function Challenge() {
  //number = 1 : 부모 , number = 0 : 자식
  const role: number = 0;
  return <>{role === 1 ? <ChallengeParents /> : <ChallengeChild />}</>;
}

export default Challenge;
