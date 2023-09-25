import React from "react";
import ModalBody1 from "../../modal/ModalBtn2";
import { Money } from "@mui/icons-material";
import RegistChild from "../../modal/ChildCreate";
import Allowance from "../Common/Main/Allowance";
import {
  MainContainer,
  TextContainer,
  TextMentBox,
  TextEmojiBox,
  Emoji,
} from "../Common/Main/Main";
import { Text } from "../Common/Main/MainStyle";
import Qr from "../Common/Main/Qr";
import SpacialAllowance from "../Common/Main/SpacialAllowance";
import { Container } from "../Common/About/AboutContainer";

function ParentsPage() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <Container height="15%">
        <ModalBody1
          modal_start_text="자녀추가"
          modal_title="자녀 등록하기"
          modal_content={<RegistChild />} /**테그 넣는 방법*/
          modal_btn1="생성"
          modal_btn2="취소"
          btn_justify="space-around"
        />
      </Container>
      <TextContainer>
        <TextMentBox>
          <Text>현재 {childName}는</Text>
          <Text>매달 {childAllowance}원을 </Text>
          <Text>받고 있어요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji
            // url={process.env.PUBLIC_URL + "/images/Money.png"}
            url={`${Money}`}
            width="80%"
            height="80%"
          />
        </TextEmojiBox>
      </TextContainer>
      <Container height="60%">
        <Allowance />
      </Container>
      <Container height="50%">
        <SpacialAllowance />
      </Container>
      <Container height="30%">
        <Qr />
      </Container>
    </MainContainer>
  );
}

export default ParentsPage;
