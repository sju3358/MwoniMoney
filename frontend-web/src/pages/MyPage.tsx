import React, { useState } from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  border: 1px solid black;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "50%")};
  height: ${(props) => (props.height ? props.height : "100%")};
`;

function Main() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevChecked: boolean) => !prevChecked);
  };

  const name = "이지현"; // api연결시 자녀1 이름으로 매핑
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
      <Container height="50%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HalfBox
            width="70%"
            height="30%"
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
                color: "var(--text-color-unactive, #969696)",
              }}
            >
              이지현
            </TextBox>
          </HalfBox>
          <HalfBox width="70%" height="30%">
            <TextBox fontSize="1.5em">생년월일</TextBox>
            <TextBox
              height="30%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                marginTop: "10px", // 상단 여백 추가
                color: "var(--text-color-unactive, #969696)",
              }}
            >
              이지현
            </TextBox>
          </HalfBox>
          <HalfBox width="70%" height="30%">
            <TextBox fontSize="1.5em">계좌</TextBox>
            <TextBox
              height="30%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                marginTop: "10px", // 상단 여백 추가
                color: "var(--text-color-unactive, #969696)",
                textDecoration: "underline underline", // 밑줄을 두 번 그리기
              }}
            >
              이지현
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
      <Container height="80%">
        <WhiteBox1>
          <HalfBox width="90%" height="50%">
            <TextBox fontSize="1.5em">알림설정</TextBox>
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
              이지현
              <Switch
                checked={checked}
                onChange={handleChange}
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
              이지현
              <Switch
                checked={checked}
                onChange={handleChange}
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
              이지현
              <Switch
                checked={checked}
                onChange={handleChange}
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
              이지현
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
            </TextBox>
            <TextBox
              fontSize="1.5em"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              FAQ <ArrowForwardIcon />{" "}
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
    </MainContainer>
  );
}

export default Main;
