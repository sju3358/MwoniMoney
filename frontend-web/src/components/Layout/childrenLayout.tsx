import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";

function ChildrenLayout() {
  return (
    <>
      {/* <Header /> */}
      <div>자식 헤더</div>
      <div style={{ height: "80vh", paddingTop: "10vh" }}>
        <Outlet />
      </div>
      <div>자식 푸터</div>
      {/* <Footer /> */}
    </>
  );
}

export default ChildrenLayout;
