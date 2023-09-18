import React from "react";
import styled from "styled-components";

const HeaderBody = styled.div`
  border: 1px solid black;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 10vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Header() {
  return <HeaderBody></HeaderBody>;
}

export default Header;
