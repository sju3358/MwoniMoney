import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import FooterChild from "./footerChild";

function ChildrenLayout() {
  return (
    <>
      <Header />
      <div style={{ height: "80vh", paddingTop: "10vh" }}>
        <Outlet />
      </div>
      <FooterChild />
    </>
  );
}

export default ChildrenLayout;
