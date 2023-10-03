import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios"; // axios 라이브러리를 임포트
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";
import api from "../apis/Api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const App: React.FC = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // 로딩 상태를 true로 설정
      setLoading(true);

      // 챗봇과의 대화 요청 보내기
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        const response = await axios.post(
          "https://j9b310.p.ssafy.io/django/chatbot/question", // 요청 주소 수정
          {
            question: input,
            birthYear: userData.birthday.substring(0, 4),
          },
          config // 헤더를 추가한 config 객체를 전달
        );

        // 챗봇 응답을 받아서 메시지로 추가
        const botMessage: Message = {
          id: Date.now() + 1, // 고유 ID 생성
          text: response.data.answer, // 챗봇 응답 메시지
          sender: "bot",
        };

        // 로딩 상태를 false로 설정
        setLoading(false);

        // 메시지 목록에 챗봇 응답 추가
        setMessages([...messages, botMessage]);
      } catch (error) {
        // 오류 처리
        console.error("Error sending message:", error);

        // 로딩 상태를 false로 설정
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // 스크롤 바를 맨 아래로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Chat App</Typography>
        </Toolbar>
      </AppBar>
      <Container
        style={{ height: "80vh", display: "flex", flexDirection: "column" }}
      >
        <List
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: "64px", // 입력창의 높이만큼 여백 추가
          }}
        >
          {messages.map((message) => (
            <ListItem
              key={message.id}
              style={{
                textAlign: message.sender === "user" ? "right" : "left",
              }}
            >
              <ListItemText
                primary={
                  <span
                    style={{
                      background:
                        message.sender === "user" ? "#007bff" : "transparent",
                      color: message.sender === "user" ? "#fff" : "#000",
                      borderRadius: "4px",
                      padding: "8px 12px",
                    }}
                  >
                    {message.sender === "user" ? "You" : "Bot"}
                  </span>
                }
                secondary={message.text}
              />
            </ListItem>
          ))}
        </List>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            aria-label="send message"
          >
            <SendIcon />
          </IconButton>
        </div>
        {loading && <div>Loading...</div>} {/* 로딩 중인 경우 메시지 표시 */}
      </Container>
    </div>
  );
};

export default App;
