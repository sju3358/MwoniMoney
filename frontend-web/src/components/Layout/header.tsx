import React from "react";
import styled from "styled-components";
import headerLogo from "../../assests/image/HeaderLogo.png";
import headerArrow from "../../assests/image/HeaderArrow.png";

const HeaderBody = styled.div`
  // border: 1px solid black;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 10vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const HeaderLogo = styled.div`
  // border: 1px solid black;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  // border: 1px solid black;
  width: 70%;
  height: 80%;
  background-image: url(${headerLogo});
  background-size: 100% 100%;
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
  return (
    <HeaderBody>
      <HeaderLogo>
        <Logo />
      </HeaderLogo>
      <HeaderProfile>
        <HeaderNameBox name="자녀변수" />
        <HeaderArrow>
          <HeaderArrowBox />
        </HeaderArrow>
      </HeaderProfile>
    </HeaderBody>
  );
}

export default Header;
