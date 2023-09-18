import React from "react";
import styled from "styled-components";
import FooterHome from "../assests/image/FooterHome.png";
import FooterChart from "../assests/image/FooterChart.png";
import FooterChallenge from "../assests/image/FooterChallenge.png";
import FooterBank from "../assests/image/FooterBank.png";
import FooterSetting from "../assests/image/FooterSetting.png";

const FooterBody = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface FooterBoxProps {
  backgroundImage: string;
}

const FooterBox = styled.div<FooterBoxProps>`
  // border: 1px solid black;
  width: 20%;
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;
  cursor: pointer;
`;

function Footer() {
  return (
    <FooterBody>
      <FooterBox backgroundImage={FooterHome} />
      <FooterBox backgroundImage={FooterChart} />
      <FooterBox backgroundImage={FooterChallenge} />
      <FooterBox backgroundImage={FooterBank} />
      <FooterBox backgroundImage={FooterSetting} />
    </FooterBody>
  );
}

export default Footer;
