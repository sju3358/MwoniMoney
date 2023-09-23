import React from "react";
import CustomizedAccordions from "../components/Common/Faq/CustomizedAccordions";
import { Container } from "../components/Common/About/AboutContainer";
import { TextBox, Text } from "../components/Common/About/AboutText";
import { Img } from "../components/Common/About/AboutEmogi";
import RightArrow from "../assests/image/main/RightArrow.png";
import { MainContainer } from "../components/Common/Main/Main";
import { Link } from "react-router-dom";

function Faq() {
  return (
    <Container width="100%" height="100%">
      <Container
        width="90%"
        height="100%"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <TextBox width="100%" height="10%" marginL="0%">
          <Link to="/MyPage">
            <Img src={`${RightArrow}`} width="100%" height="100%" />
          </Link>
          <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 0% 30%">
            FAQ
          </Text>
        </TextBox>
        <Container
          width="100%"
          height="100%"
          style={{ alignItems: "flex-start", padding: "10% 0% 0% 0%" }}
        >
          <CustomizedAccordions />
        </Container>
      </Container>
    </Container>
  );
}

export default Faq;
