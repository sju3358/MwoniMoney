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
} from "../components/Parents/MyPage";

import { WhiteBox1 } from "../components/Common/AboutWhilteContainer";
import { TextBox } from "../components/Common/AboutText";

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
  // border: 1px solid black;
  // box-sizing: border-box;
`;

interface HalfBoxProps {
  width?: string;
  height?: string;
}

const HalfBox = styled.div<HalfBoxProps>`
  // border: 1px solid black;
  // box-sizing: border-box;
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
        <WhiteBox1>
          <HalfBox width="70%" height="50%">
            <TextBox fontSize="1.5em">이름</TextBox>
            <TextBox
              height="0%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                textDecoration: "underline",
              }}
            >
              이지현
            </TextBox>
            <TextBox fontSize="1.5em">생년월일</TextBox>
            <TextBox
              height="0%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                textDecoration: "underline",
              }}
            >
              이지현
            </TextBox>
            <TextBox fontSize="1.5em">계좌</TextBox>
            <TextBox
              height="0%"
              fontSize="1em"
              fontWeight="normal"
              style={{
                textDecoration: "underline",
              }}
            >
              이지현
            </TextBox>
          </HalfBox>
        </WhiteBox1>
      </Container>
      <Container height="80%">
        <WhiteBox1>
          <HalfBox width="70%" height="50%">
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
          </HalfBox>
        </WhiteBox1>
      </Container>
    </MainContainer>
  );
}

export default Main;
