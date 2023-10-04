import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";

function Notifications() {
  //알림
  interface CheckedSettings {
    challengeChecked: boolean;
    balanceChecked: boolean;
    savingChecked: boolean;
    allowanceChecked: boolean;
  }
  const [checked, setChecked] = useState<CheckedSettings>({
    challengeChecked: false,
    balanceChecked: false,
    savingChecked: false,
    allowanceChecked: false,
  });
  const handleChange = (settingName: keyof CheckedSettings) => () => {
    setChecked((prevSettings) => ({
      ...prevSettings,
      [settingName]: !prevSettings[settingName],
    }));
  };

  return (
    <Container height="25%">
      <WhiteBox1 justify="center" align="center">
        <Container width="95%" height="95%" flexDirection="column">
          <TextBox height="40%" fontSize="1.5em">
            알림설정
          </TextBox>
          <TextBox
            height="20%"
            fontSize="1em"
            fontWeight="normal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            챌린지 알림
            <Switch
              checked={checked.challengeChecked}
              onChange={handleChange("challengeChecked")}
              color="primary"
            />
          </TextBox>
          <TextBox
            height="20%"
            fontSize="1em"
            fontWeight="normal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            밸런스게임 알림
            <Switch
              checked={checked.balanceChecked}
              onChange={handleChange("balanceChecked")}
              color="primary"
            />
          </TextBox>
          <TextBox
            height="20%"
            fontSize="1em"
            fontWeight="normal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            짜금통 알림
            <Switch
              checked={checked.savingChecked}
              onChange={handleChange("savingChecked")}
              color="primary"
            />
          </TextBox>
          {/* <TextBox
            height="20%"
            fontSize="1em"
            fontWeight="normal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            정기 용돈
            <Switch
              checked={checked.allowanceChecked}
              onChange={handleChange("allowanceChecked")}
              color="primary"
            />
          </TextBox> */}
        </Container>
      </WhiteBox1>
    </Container>
  );
}

export default Notifications;
