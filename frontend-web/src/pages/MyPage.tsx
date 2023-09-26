import React, { useState } from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";

import {
  Emoji,
  MainContainer,
  Text,
  TextContainer,
  TextEmojiBox,
  TextMentBox,
} from "../components/Common/MyPage/MyPage";

import { WhiteBox1 } from "../components/Common/About/AboutWhilteContainer";
import { TextBox } from "../components/Common/About/AboutText";
import { Link } from "react-router-dom";
import { Img } from "../components/Common/About/AboutEmogi";
import LeftArrow from "../assests/image/main/LeftArrow.png";

interface ContainerProps {
  height: string;
  flexDirection?: string | null;
}

export const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height}; /* props.height 값을 스타일에 적용 */
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

interface HalfBoxProps {
  width?: string;
  height?: string;
}

const HalfBox = styled.div<HalfBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "85%")};
  height: ${(props) => (props.height ? props.height : "100%")};
`;

//알림
interface CheckedSettings {
  challengeChecked: boolean;
  balanceChecked: boolean;
  savingChecked: boolean;
  allowanceChecked: boolean;
}

function Mypage() {
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

  const account = "000-000-0000";
  const name = "이지현"; // api연결시 자녀1 이름으로 매핑
  const birth = "00.01.01";
  return (
    <MainContainer>
      <TextContainer>
        <TextMentBox>
          <Text>{name}님</Text>
          <Text>안녕하세요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </TextContainer>
      <Container height="30%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HalfBox height="100%">
            <TextBox fontSize="1.5em">계좌</TextBox>
            <TextBox
              height="30%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                marginTop: "10px", // 상단 여백 추가
                borderBottom: "1px solid black",
                paddingLeft: "5%",
              }}
            >
              {account}
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
      <Container height="50%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HalfBox
            height="90%"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextBox fontSize="1.5em">이름</TextBox>
            <TextBox
              height="30%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                marginTop: "10px", // 상단 여백 추가
                // color: "var(--text-color-unactive, #969696)",
                borderBottom: "1px solid black",
                paddingLeft: "5%",
              }}
            >
              {name}
            </TextBox>
            <TextBox fontSize="1.5em">생년월일</TextBox>
            <TextBox
              height="30%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                marginTop: "10px", // 상단 여백 추가
                // color: "var(--text-color-unactive, #969696)",
                borderBottom: "1px solid black",
                paddingLeft: "5%",
              }}
            >
              {birth}
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
      <Container height="50%">
        <WhiteBox1>
          <HalfBox width="90%" height="90%">
            <TextBox height="30%" fontSize="1.5em">
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
              정기 용돈
              <Switch
                checked={checked.allowanceChecked}
                onChange={handleChange("allowanceChecked")}
                color="primary"
              />
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
      <Container
        height="10%"
        style={{
          margin: "5% 0% 5% 0%",
        }}
      >
        <WhiteBox1
          style={{
            alignItems: "center",
          }}
        >
          <TextBox
            fontSize="1.5em"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            FAQ
          </TextBox>
          <Link
            to="/Faq"
            style={{
              paddingRight: "5%",
            }}
          >
            <Img src={LeftArrow} />
          </Link>
        </WhiteBox1>
      </Container>
    </MainContainer>
  );
}

export default Mypage;
