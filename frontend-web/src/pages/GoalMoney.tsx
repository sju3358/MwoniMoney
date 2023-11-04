import React from "react";
import GoalParent from "../components/Parents/GoalParent";
import GoalChild from "../components/Children/GoalChild";
import { Navigate } from "react-router-dom";
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";

function GoalMoney(): JSX.Element {
  const [userData] = useRecoilState(userDataState);
  const role = userData.memberRole;

  switch (role) {
    case "PARENT":
      return <GoalParent />;
    case "CHILD":
      return <GoalChild />;
    case "GUEST":
      return <Navigate to="/RegistRole" />;
    default:
      return <Navigate to="/LoginPage" />;
  }
}

export default GoalMoney;
