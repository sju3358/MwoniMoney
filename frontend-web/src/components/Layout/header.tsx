import React from "react";
import styled from "styled-components";
import LogoA from "./Logo.png";
import headerArrow from "../../assests/image/HeaderArrow.png";
import { Navigate, useNavigate } from "react-router-dom";

const HeaderBody = styled.div`
  // border: 1px solid black;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 8vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10000000;
`;

const HeaderLogo = styled.div`
  // border: 1px solid black;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Logo = styled.div`
  // border: 1px solid black;
  width: 60%;
  height: 65%;
  background-image: url(${LogoA});
  background-size: 100% 100%;
  margin-left: 5%;
`;

interface profileBoxProps {
  name: string;
}

const HeaderProfile = styled.div`
  // border: 1px solid black;
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderNameBox = styled.div<profileBoxProps>`
  // border: 1px solid black;
  width: 75%;
  height: 70%;
`;
const HeaderArrow = styled.div`
  // border: 1px solid black;
  width: 25%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
`;

const HeaderArrowBox = styled.div`
  width: 55%;
  height: 55%;
  background-image: url(${headerArrow});
  background-size: 100% 100%;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <HeaderBody>
      <HeaderLogo>
        <Logo onClick={handleClick} />
      </HeaderLogo>
      <HeaderProfile>
        <HeaderNameBox name="자녀변수" />
      </HeaderProfile>
    </HeaderBody>
  );
}

export default Header;
