import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from 'react-router-dom';



function Layout() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default Layout;
