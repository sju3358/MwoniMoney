import React from "react";
import {
  Emoji,
  MainContainer,
  Text,
  TextEmojiBox,
  TextMentBox,
} from "./MyPageStyle";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { useRecoilState } from "recoil";
import RoleSelect from "./RoleSelect";
import InputInfo from "./InputInfo";
import Notifications from "./Notifications";
import FAQ from "./FAQ";

import { userCheckState, userDataState } from "../../../states/UserInfoState";
import MypageModal from "../../../modal/Mypage/MypageModal";
function MypageCompo() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userCheck, setUserCheck] = useRecoilState(userCheckState);

  const account = "000-000-0000";
  const name = userData.name; // api연결시 자녀1 이름으로 매핑
  const birth = userData.birthday;
  const email = userData.email;
  const memberRole = userData.memberRole;

  console.log(userData);
  console.log(userCheck);

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
      {/* 정보입력칸  */}
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
            <InputInfo
              title="이름"
              info={`${name}`}
              placeholder="실명을 적어주세요"
              id="name"
            />
            <InputInfo
              title="생년월일"
              info={`${birth}`}
              placeholder="1997-03-20"
              id="birthday"
            />
            <InputInfo
              title="이메일"
              info={`${email}`}
              placeholder="email@domail.com"
              id="email"
            />
          </Container>
        </WhiteBox1>
      </Container>
      <Container height="25%">
        <WhiteBox1 height="90%" justify="center" align="center">
          <Container width="95%" height="95%" flexDirection="column">
            <Container height="30%">
              <TextBox fontSize="1.5em" height="100%">
                역할
              </TextBox>
            </Container>
            <Container height="65%" flexDirection="column">
              {userData.memberRole === "GUEST" ? (
                <RoleSelect />
              ) : (
                <TextBox>{memberRole == "PARENT" ? "부모" : "자녀"}</TextBox>
              )}
            </Container>
          </Container>
        </WhiteBox1>
      </Container>
      <Notifications />
      <FAQ />
      <MypageModal />
    </MainContainer>
  );
}

export default MypageCompo;
