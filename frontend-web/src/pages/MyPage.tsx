import React, { useState } from "react";
import Switch from "@mui/material/Switch";

import {
  Emoji,
  MainContainer,
  Text,
  TextEmojiBox,
  TextMentBox,
} from "../components/Common/MyPage/MyPage";
import { Container } from "../components/Common/About/AboutContainer";
import { WhiteBox1 } from "../components/Common/About/AboutWhilteContainer";
import { InputBox, TextBox } from "../components/Common/About/AboutText";
import { Link } from "react-router-dom";
import { Img } from "../components/Common/About/AboutEmogi";
import LeftArrow from "../assests/image/main/LeftArrow.png";
import { userDataState } from "../states/UserInfoState";
import { useRecoilState } from "recoil";

// 입력칸
interface InputImfoProps {
  title: string;
  info: string;
  placeholder: string;
  id: string;
}

function InputImfo({ title, info, placeholder, id }: InputImfoProps) {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(inputValue);
    setUserData((userData: any) => ({
      ...userData,
      [id]: inputValue,
    }));
  };
  return (
    <>
      <Container height="30%">
        <TextBox fontSize="1.5em" height="100%">
          {title}
        </TextBox>
      </Container>
      <Container
        flexDirection="column"
        height="75%"
        justifyContent="center"
        align="center"
      >
        {userData.memberRole === "GUEST" ? (
          <TextBox
            height="40%"
            width="93%"
            fontSize="1em"
            fontWeight="normal"
            marginL="0%"
            style={{ borderBottom: "1px solid black" }}
          >
            <Container height="100%" width="80%">
              <InputBox
                height="100%"
                width="100%"
                type="text"
                fontsize="1.4em"
                placeholder={placeholder}
                id={id}
                onChange={handleInputChange}
              />
            </Container>
            <Container
              height="100%"
              width="20%"
              backcolor="#fbd56e"
              onClick={handleButtonClick}
            >
              추가
            </Container>
          </TextBox>
        ) : (
          <TextBox
            height="30%"
            width="93%"
            fontSize="1em"
            fontWeight="normal"
            marginL="0%"
            style={{ borderBottom: "1px solid black" }}
          >
            {info}
          </TextBox>
        )}
      </Container>
    </>
  );
}

//알림
interface CheckedSettings {
  challengeChecked: boolean;
  balanceChecked: boolean;
  savingChecked: boolean;
  allowanceChecked: boolean;
}

function Mypage() {
  const [userData, setUserData] = useRecoilState(userDataState);
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
  console.log(userData);

  const account = "000-000-0000";
  const name = userData.name; // api연결시 자녀1 이름으로 매핑
  const birth = userData.birthday;
  const memberRole = userData.memberRole;

  return (
    <MainContainer>
      {/* 페이지 제목 & 이미지 */}
      <Container width="100%" height="20%">
        <TextMentBox>
          <Text>{name}님</Text>
          <Text>안녕하세요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </Container>
      {/* 계좌번호 입력하는 칸 */}
      <Container height="30%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container height="30%">
            <TextBox fontSize="1.5em" height="100%">
              계좌번호
            </TextBox>
          </Container>
          <Container
            flexDirection="column"
            height="75%"
            justifyContent="center"
            align="center"
          >
            <TextBox
              height="30%"
              width="93%"
              fontSize="1em"
              fontWeight="normal"
              marginL="0%"
              style={{ borderBottom: "1px solid black" }}
            >
              {account}
            </TextBox>
          </Container>
        </WhiteBox1>
      </Container>

      <Container height="60%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            height="100%"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputImfo
              title="이름"
              info={`${name}`}
              placeholder="실명을 적어주세요"
              id="name"
            />
            <InputImfo
              title="생년월일"
              info={`${birth}`}
              placeholder="1997-03-20"
              id="birthday"
            />
          </Container>
        </WhiteBox1>
      </Container>
      <Container height="50%">
        <WhiteBox1 justify="center" align="center">
          <Container width="95%" height="95%" flexDirection="column">
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
          </Container>
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
