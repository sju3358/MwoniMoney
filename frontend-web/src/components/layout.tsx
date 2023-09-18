import React from "react";
import styled from "styled-components";
import Footer from "./footer";
import Header from "./header";

const Main = styled.div`
  width: 100vw;
  height: 80vh;
`;

interface LayoutProps {
  MainContents: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{props.MainContents}</Main>
      <Footer />
    </>
  );
}

export default Layout;
