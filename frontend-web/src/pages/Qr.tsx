import React from "react";
import { useState } from "react";
import QRCode from "qrcode.react";

function Qr() {
  const parentsUuid = localStorage.getItem("");
  const qrLink = "https://j9b310.p.ssafy.io/api/v1/children/${parentsUuid}";

  return (
    <div>
      <QRCode value={qrLink} />{" "}
    </div>
  );
}

export default Qr;
