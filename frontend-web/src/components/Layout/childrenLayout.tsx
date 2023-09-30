import React from "react";
import Footer from "./footer";
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

      {/* <Footer /> */}
      <FooterChild />
    </>
  );
}

export default ChildrenLayout;
