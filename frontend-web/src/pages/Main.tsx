import React from "react";
import ChildrenPage from "./ChildrenPage";
import ParentsPage from "./ParentsPage";

function Main() {
  //number = 1 : 부모 , number = 0 : 자식
  const role: number = 0;
  return <>{role === 1 ? <ParentsPage /> : <ChildrenPage />}</>;
}

export default Main;
