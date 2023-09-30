import React, { useEffect } from "react";
import "./Chatting.css";

import { useRecoilValue } from "recoil";
import { userDataState } from "../../states/UserInfoState";

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

import { api } from "../../apis/Api";
import moment from "moment";

export default function Chatting({ balanceGameIdx = 1 }) {
  const memberInfo = useRecoilValue(userDataState);

  const memberUUID = memberInfo.uuid;
  const memberNickname = memberInfo.nickname;

  let beforeSender = "";

  // 세션 연결
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    const eventSource = new EventSource(
      `http://localhost:8080/api/v1/balances/${balanceGameIdx}/chatting`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(eventSource);

    eventSource.onmessage = (event: any) => {
      console.log(33333);

      const data = JSON.parse(event.data);
      // console.log(data);

      // 로그인 유저가 보낸 메세지
      if (data.senderUUID === memberUUID) {
        // 파란 박스(오른쪽)
        initMyMessage(data);
      } else {
        // 회색 박스 (왼쪽)
        initYourMessage(data);
      }
    };
  }, []);

  // 파란 박스 초기화/동기화
  function initMyMessage(data: any) {
    const chatBox = document.querySelector("#chat-box");

    let convertTime = moment(data.createdTime).format("HH:MM | MM-DD");

    let sendBox = "";

    if (beforeSender === memberUUID) {
      sendBox = `
            <div id="outgoingMsg">
                <div id="sendMsg">
                    <div id="sendDataFlex">
                        <div id="sendMsgData"> ${data.message} </div>
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
                      <div id="nickName"> <b>${data.senderNickname}</b> </div>
                  </div>
                  
                  <div id="sendMsgData"> ${data.message} </div>
                  <span id="timeDate"> ${convertTime} </span>
              </div>
          </div>
      </div>`;
    }

    beforeSender = memberUUID;

    if (chatBox != null) {
      chatBox.innerHTML += sendBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // 회색 박스 초기화/동기화
  function initYourMessage(data: any) {
    let chatBox = document.querySelector("#chat-box");

    let convertTime = moment(data.createdTime).format("HH:MM | MM-DD");

    let receivedBox = "";

    if (beforeSender === data.sender) {
      receivedBox = `
      <div id="receivedMsg">
          <div id="receivedWithdMsg">
              <div id="receivedDataFlex">
                  <div id="receivedWithdMsgData"> ${data.message} </div>
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
                      <div id="nickName"> <b>${data.senderNickname}</b> </div>
                  </div>
                  
                  <div id="receivedWithdMsgData"> ${data.message} </div>
                  
                  <span id="receivedTimeDate"> ${convertTime} </span>
              </div>
          </div>
      </div>`;
    }

    beforeSender = data.sender;

    if (chatBox != null) {
      chatBox.innerHTML += receivedBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // DB에 새 채팅 보내기 : AJAX 채팅 메시지 전송
  async function addMessage() {
    let msgInput: any;

    msgInput = document.querySelector("#chat-outgoing-msg");

    let chat = {
      senderNickname: memberNickname,
      message: msgInput.value,
      senderUUID: memberUUID,
      balanceGameIdx: balanceGameIdx,
      createdTime: new Date(),
    };

    console.log(chat);

    api
      .post(`/v1/balances/${balanceGameIdx}/chatting`, chat)
      .catch((result) => console.log(result));

    msgInput.value = "";
  }

  // 전송 버튼 클릭시 메시지 전송
  const enterMsg = () => {
    addMessage();
  };

  // 엔터를 치면 메시지 전송
  const sendMsg = (e: any) => {
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
          전송
        </button>
      </div>
    </div>
  );
}
