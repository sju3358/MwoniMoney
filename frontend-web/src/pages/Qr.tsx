import React from "react";
import { useState } from "react";
import QRCode from "qrcode.react";
import { TextBox } from "../components/Common/About/AboutText";
import { useRecoilValue } from "recoil";
import { userDataState } from "../states/UserInfoState";

// FlexDirection 타입 정의
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

function Qr() {
  const userData = useRecoilValue(userDataState);
  console.log(userData);
  const uuid = userData.uuid;
  console.log(uuid);
  // 먼저 로그인 페이지로 가고 거기서 로그인 하면 redirect 합시다!

  const qrLink = `https://j9b310.p.ssafy.io/QrLoginPage?parentuuid=${uuid}`;
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as FlexDirection, // FlexDirection 타입으로 지정
    justifyContent: "center",
    alignItems: "center",
    height: "70vh", // 화면의 높이만큼 컨테이너를 채웁니다.
  };

  const textBoxStyle = {
    marginBottom: "40px", // TextBox와 QRCode 사이의 간격을 더 크게 조절
  };

  return (
    <div style={containerStyle}>
      <div style={textBoxStyle}>
        <TextBox marginL="0%">아이와 연결!</TextBox>
      </div>
      <QRCode value={qrLink} />
    </div>
  );
}

export default Qr;
