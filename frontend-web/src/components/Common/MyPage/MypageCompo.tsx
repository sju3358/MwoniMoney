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
import InputInfo from "./InputInfo";
import Notifications from "./Notifications";
import FAQ from "./FAQ";

import { userAccountState, userDataState } from "../../../states/UserInfoState";
import MypageModal from "../../../modal/Mypage/MypageModal";

function MypageCompo() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const account = userAccount.account;
  const name = userData.name; // api연결시 자녀1 이름으로 매핑
  const birth = userData.birthday;
  const email = userData.email;

  // console.log(userData);
  // console.log(userCheck);

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

      <Notifications />
      <FAQ />
      <MypageModal />
    </MainContainer>
  );
}

export default MypageCompo;
