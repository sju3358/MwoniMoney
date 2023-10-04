import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";

function ParentsLayout() {
  return (
    <>
      <Header />
      <div
        style={{
          height: "80vh",
          paddingTop: "10vh",
          overflowX: "hidden",
          overflowY: "auto",
          // border: "2px solid orange",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default ParentsLayout;
