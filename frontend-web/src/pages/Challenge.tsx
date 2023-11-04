import React from "react";
import ChallengeParents from "../components/Parents/Challenge";
import ChallengeChild from "../components/Children/Challenge";
import { Navigate } from "react-router-dom";
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";

function Challenge(): JSX.Element {
  const [userData] = useRecoilState(userDataState);

  const role = userData.memberRole;

  switch (role) {
    case "PARENT":
      return <ChallengeParents />;
    case "CHILD":
      return <ChallengeChild ismain="N" />;
    case "GUEST":
      // GUEST일 경우 Navigate 컴포넌트로 리디렉션
      return <Navigate to="/RegistRole" />;
    default:
      // 다른 역할에 대한 처리 (예: 기본 페이지로 리디렉션)
      return <Navigate to="/LoginPage" />;
  }
}

export default Challenge;
