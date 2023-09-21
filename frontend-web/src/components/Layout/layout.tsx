import React from "react";
import ChildrenLayout from "./childrenLayout";
import ParentsLayout from "./parentsLayout";

function Layout() {
  //number = 1 : 부모 , number = 0 : 자식
  const role: number = 0;
  return <>{role === 1 ? <ParentsLayout /> : <ChildrenLayout />}</>;
}

export default Layout;
