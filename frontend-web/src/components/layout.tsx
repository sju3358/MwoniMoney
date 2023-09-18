import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div style={{ height: "80vh", paddingTop: "10vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
