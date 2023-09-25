import React from "react";
import CustomizedAccordions from "../components/Common/Faq/CustomizedAccordions";
import { Container } from "../components/Common/About/AboutContainer";
import { TextBox, Text } from "../components/Common/About/AboutText";
import { Img } from "../components/Common/About/AboutEmogi";
import RightArrow from "../assests/image/main/RightArrow.png";
import { MainContainer } from "../components/Common/Main/Main";
import { Link } from "react-router-dom";
import QuestionU from "../assests/image/faq/QuestionU.png";
import QuestionB from "../assests/image/faq/QuestionB.png";
import styled, { keyframes } from "styled-components";

const moveUp = keyframes`
0%, 100% {
  top: 10%; /* 초기 위치 (FAQ 글자 아래) */
  left: 0; /* 가운데 정렬을 위해 시작 위치 설정 */
  opacity: 1; /* 초기 투명도 설정 */
}
50% {
  top: -5%; /* 중간 위치 (위로 조금 이동) */
  opacity: 0.7; /* 중간 투명도 설정 */
}
`;

const moveDown = keyframes`
0%, 100% {
  bottom: 10%; /* 초기 위치 (FAQ 글자 아래) */
  right: 0%; /* 가운데 정렬을 위해 시작 위치 설정 */
  opacity: 1; /* 초기 투명도 설정 */
}
50% {
  bottom: 5%; /* 중간 위치 (위로 조금 이동) */
  opacity: 0.7; /* 중간 투명도 설정 */
}
`;

const Img_U = styled(Img)`
  position: absolute;
  // left: 50%; /* 가운데 정렬을 위한 설정 */
  // transform: translateX(-50%); /* 가운데 정렬을 위한 설정 */
  animation: ${moveUp} 3s linear infinite; /* 무한 반복 애니메이션 */
  z-index: -1;
`;
const Img_B = styled(Img)`
  position: absolute;
  // left: 50%; /* 가운데 정렬을 위한 설정 */
  // transform: translateX(-50%); /* 가운데 정렬을 위한 설정 */
  animation: ${moveDown} 3s linear infinite; /* 무한 반복 애니메이션 */
  z-index: -1;
`;
function Faq() {
  return (
    <Container style={{ position: "relative" }} width="100%" height="100%">
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
      <Img_U src={`${QuestionU}`} width="30%" height="30%" />
      <Img_B src={`${QuestionB}`} width="30%" height="30%" />
    </Container>
  );
}

export default Faq;
