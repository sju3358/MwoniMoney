import React from "react";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { Link } from "react-router-dom";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";
import { Img } from "../../../components/Common/About/AboutEmogi";

function FAQ() {
  return (
    <Container
      height="10%"
      style={{
        margin: "5% 0% 5% 0%",
      }}
    >
      <WhiteBox1
        style={{
          alignItems: "center",
        }}
      >
        <TextBox
          fontSize="1.5em"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          FAQ
        </TextBox>
        <Link
          to="/Faq"
          style={{
            paddingRight: "5%",
          }}
        >
          <Img src={LeftArrow} />
        </Link>
      </WhiteBox1>
    </Container>
  );
}

export default FAQ;
