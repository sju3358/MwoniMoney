import React from "react";
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

  const qrLink = `https://j9b310.p.ssafy.io/QrLoginPage?parentuuid=${uuid}`;
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const textBoxStyle = {
    marginBottom: "40px",
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
