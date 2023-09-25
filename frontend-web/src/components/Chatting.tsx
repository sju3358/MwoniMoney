import React, { useState, useEffect } from "react";
import "./ChattingSection.css";
import { useRecoilValue } from "recoil";
import { memberNumberState } from "../../../store/loginUserState";
import { memberNicknameState } from "../../../store/loginUserInfoState";
import https from "../../../utils/https";
import { BsSendFill } from "react-icons/bs";
import moment from "moment";

interface ChatMessage {
  bubbleNumber: number;
  msg: string;
  nickName: string;
  level: string;
  sender: number;
  createdAt: string;
}

export default function ChattingSection({ bubbleNum = 0 }) {
  const memberNumber = useRecoilValue(memberNumberState);
  const memberNickName = useRecoilValue(memberNicknameState);
  let beforeSender = 0;

  // SSE 연결하기
  useEffect(() => {
    const eventSource = new EventSource(
      `https://i9b108.p.ssafy.io:8080/api/v1/bubble/chat/${bubbleNum}`
    );
    eventSource.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);

      // 로그인 유저가 보낸 메세지
      if (data.sender === memberNumber) {
        // 파란 박스(오른쪽)
        initMyMessage(data);
      } else {
        // 회색 박스 (왼쪽)
        initYourMessage(data);
      }
    };
  }, []);

  // 파란 박스 초기화/동기화
  function initMyMessage(data: ChatMessage) {
    let chatBox = document.querySelector("#chat-box") as HTMLElement;

    let convertTime = moment(data.createdAt).format("HH:MM | MM-DD");

    let sendBox = "";

    if (beforeSender === memberNumber) {
      sendBox = `
            <div id="outgoingMsg">
                <div id="sendMsg">
                    <div id="sendDataFlex">
                        <div id="sendMsgData"> ${data.msg} </div>
                        <span id="timeDate"> ${convertTime} </span>
                    </div>
                </div>
            </div>`;
    } else {
      sendBox = `
      <div id="outgoingMsg">
          <div id="sendMsg">
              <div id="sendDataFlex">
                  <div id="chat-profile">
                      <div id="nickName"> <b>${data.nickName}</b> </div>
                      <img id="chat-profile-img" src="../../chat-profile${data.level}.png" alt="AvatarImg"/>
                  </div>
                  
                  <div id="sendMsgData"> ${data.msg} </div>
                  <span id="timeDate"> ${convertTime} </span>
              </div>
          </div>
      </div>`;
    }

    beforeSender = memberNumber;

    chatBox.innerHTML += sendBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // 회색 박스 초기화/동기화
  function initYourMessage(data: ChatMessage) {
    let chatBox = document.querySelector("#chat-box") as HTMLElement;

    let convertTime = moment(data.createdAt).format("HH:MM | MM-DD");

    let receivedBox = "";

    if (beforeSender === data.sender) {
      receivedBox = `
      <div id="receivedMsg">
          <div id="receivedWithdMsg">
              <div id="receivedDataFlex">
                  <div id="receivedWithdMsgData"> ${data.msg} </div>
                  <span id="receivedTimeDate"> ${convertTime} </span>
              </div>
          </div>
      </div>`;
    } else {
      receivedBox = `
      <div id="receivedMsg">
          <div id="receivedWithdMsg">
              <div id="receivedDataFlex">
                  <div id="receivedChatProfile">
                      <img id="chat-profile-img" src="../../chat-profile${data.level}.png" alt="AvatarImg"/>
                      <div id="nickName"> <b>${data.nickName}</b> </div>
                  </div>
                  
                  <div id="receivedWithdMsgData"> ${data.msg} </div>
                  
                  <span id="receivedTimeDate"> ${convertTime} </span>
              </div>
          </div>
      </div>`;
    }

    beforeSender = data.sender;

    chatBox.innerHTML += receivedBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // DB에 새 채팅 보내기 : AJAX 채팅 메시지 전송
  async function addMessage() {
    let msgInput = document.querySelector(
      "#chat-outgoing-msg"
    ) as HTMLInputElement;

    let chat: ChatMessage = {
      bubbleNumber: bubbleNum,
      msg: msgInput.value,
      nickName: memberNickName,
      level: "", // 이 부분을 채워주세요.
      sender: memberNumber,
      createdAt: moment().toISOString(), // 이 부분을 채워주세요.
    };

    try {
      await https.post("/api/v1/bubble/chat", chat);
    } catch (error) {
      console.error(error); // 또는 적절한 오류 처리 로직을 추가
    }

    msgInput.value = "";
  }

  // 전송 버튼 클릭시 메시지 전송
  const enterMsg = () => {
    addMessage();
  };

  // 엔터를 치면 메시지 전송
  const sendMsg = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  };

  return (
    <div id="user_chat_data">
      <div id="chat-box"></div>

      <div id="typeMsg">
        <input
          onKeyDown={(e) => sendMsg(e)}
          id="chat-outgoing-msg"
          type="text"
          placeholder="메세지를 입력하세요"
        />
        <button id="chat-send" onClick={enterMsg} type="button">
          <div id="chat-send-icon">
            <BsSendFill />
          </div>
        </button>
      </div>
    </div>
  );
}
