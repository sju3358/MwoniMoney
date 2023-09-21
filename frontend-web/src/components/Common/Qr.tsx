import React from "react";
import styled from "styled-components";
import { WhiteBox } from "./WhiteBox";
import QrEmogi from "../../assests/image/QR.png";

const RowTextContainer = styled.div`
  // border: 1px solid black;
  width: 60%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Boldtext = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 60%;
  box-sizing: border-box;
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  // justify-content: center;
  align-items: center;
  margin-left: 5%;
`;

const Samlltext = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: 5%;
`;
const EmogiTextContainer = styled.div`
  // border: 1px solid black;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Emoji1 = styled.div`
  // border: 1px solid red;
  width: 56%;
  height: 56%;
  box-sizing: border-box;
  background-image: url(${QrEmogi});
  background-size: 100% 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;

function Qr() {
  return (
    <WhiteBox style={{ display: "flex" }}>
      <RowTextContainer>
        <Boldtext>QR 발급</Boldtext>
        <Samlltext>자녀에게</Samlltext>
        <Samlltext>QR코드를 발급해주세요!</Samlltext>
      </RowTextContainer>
      <EmogiTextContainer>
        <Emoji1 />
      </EmogiTextContainer>
    </WhiteBox>
  );
}

export default Qr;
