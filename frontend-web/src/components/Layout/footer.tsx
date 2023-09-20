import React from "react";
import styled from "styled-components";
import FooterHome from "../../assests/image/FooterHome.png";
import FooterChart from "../../assests/image/FooterChart.png";
import FooterChallenge from "../../assests/image/FooterChallenge.png";
import FooterBank from "../../assests/image/FooterBank.png";
import FooterSetting from "../../assests/image/FooterSetting.png";

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
  backgroundimage: string;
}

const FooterBox = styled.div`
  // border: 1px solid black;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FooterimgBox = styled.div<FooterBoxProps>`
  // border: 1px solid black;
  width: 75%;
  height: 75%;
  background-image: url(${(props) => props.backgroundimage});
  background-size: 100% 100%;
`;

function Footer() {
  return (
    <FooterBody>
      <FooterBox>
        <FooterimgBox backgroundimage={FooterHome} />
      </FooterBox>
      <FooterBox>
        <FooterimgBox backgroundimage={FooterChart} />
      </FooterBox>
      <FooterBox>
        <FooterimgBox backgroundimage={FooterChallenge} />
      </FooterBox>
      <FooterBox>
        <FooterimgBox backgroundimage={FooterBank} />
      </FooterBox>
      <FooterBox>
        <FooterimgBox backgroundimage={FooterSetting} />
      </FooterBox>
    </FooterBody>
  );
}

export default Footer;
