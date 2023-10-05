import React from "react";
import chatbot from "../../../assests/image/main/chatbot.png";
import { useNavigate } from "react-router-dom";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";
import { TextBox, Text } from "../About/AboutText";

function ChatbotLink() {
  const navigate = useNavigate();
  const goChatbot = () => {
    navigate("/Chatbot");
  };
  return (
    <WhiteBox1 height="90%" onClick={goChatbot}>
      <Container
        height="100%"
        width="60%"
        flexDirection="column"
        align="start"
        justifyContent="start"
      >
        <TextBox marginL="10%">챗봇에게 질문</TextBox>
        <Text>모르는 것을 챗봇과 </Text>
        <Container height="3%" />
        <Text>함께 해결해보세요!</Text>
      </Container>
      <Container height="100%" width="40%">
        <EmogiBox height="60%" width="65%" backImg={`${chatbot}`} />
      </Container>
    </WhiteBox1>
  );
}

export default ChatbotLink;
