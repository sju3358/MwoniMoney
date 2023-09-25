import React, { useState, useEffect } from "react";

interface Message {
  sender: string;
  createdAt: string;
  msg: string;
}

interface ChatProps {
  username: string;
  roomNum: string;
  balanceIdx: string; // 추가: balanceIdx를 ChatProps에 추가
}

const Chat: React.FC<ChatProps> = ({ username, roomNum, balanceIdx }) => {
  // balanceIdx를 props로 받아옴
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgInput, setMsgInput] = useState<string>("");

  const getSendMsgBox = (data: Message) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = tm + " | " + md;

    return (
      <div className="sent_msg" key={data.createdAt}>
        <p>{data.msg}</p>
        <span className="time_date">
          {" "}
          {convertTime} / <b>{data.sender}</b>{" "}
        </span>
      </div>
    );
  };

  const getReceiveMsgBox = (data: Message) => {
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = tm + " | " + md;

    return (
      <div className="received_withd_msg" key={data.createdAt}>
        <p>{data.msg}</p>
        <span className="time_date">
          {" "}
          {convertTime} / <b>{data.sender}</b>{" "}
        </span>
      </div>
    );
  };

  const initMyMessage = (data: Message) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const initYourMessage = (data: Message) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const addMessage = async () => {
    const chat: Message = {
      sender: username,
      createdAt: new Date().toISOString(),
      msg: msgInput,
    };

    setMsgInput("");

    // 여기에서 fetch 및 메시지 추가 로직 작성

    // 예시: 서버로 메시지 전송
    try {
      const response = await fetch(
        `https://j9b310.p.ssafy.io/v1/balances/${balanceIdx}/chatting`, // balanceIdx 사용
        {
          method: "POST",
          body: JSON.stringify(chat),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // 성공적으로 전송된 경우
        // 메시지 추가 또는 다른 로직 수행
      } else {
        // 전송에 실패한 경우
        // 오류 처리
      }
    } catch (error) {
      // 오류 처리
    }
  };

  useEffect(() => {
    // SSE 연결 및 메시지 수신 로직 작성
    const eventSource = new EventSource(
      `https://j9b310.p.ssafy.io/v1/balances/${balanceIdx}/chatting` // balanceIdx 사용
    );

    eventSource.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      if (data.sender === username) {
        // 로그인한 유저가 보낸 메시지
        // 파란박스(오른쪽)
        initMyMessage(data);
      } else {
        // 회색박스(왼쪽)
        initYourMessage(data);
      }
    };

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => {
      eventSource.close();
    };
  }, [username, roomNum, balanceIdx]); // balanceIdx 추가

  return (
    <div>
      {/* 채팅 UI 및 입력란 렌더링 */}
      <div id="chat-box">
        {messages.map((data) =>
          data.sender === username
            ? getSendMsgBox(data)
            : getReceiveMsgBox(data)
        )}
      </div>
      <div>
        <input
          type="text"
          id="chat-outgoing-msg"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              addMessage();
            }
          }}
        />
        <button id="chat-outgoing-button" onClick={addMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
