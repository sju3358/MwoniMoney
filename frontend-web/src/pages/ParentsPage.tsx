import React from "react";
import {
  AllowanveContainer,
  ChildrenList,
  Emoji,
  MainContainer,
  QrContainer,
  Text,
  TextContainer,
  TextEmojiBox,
  TextMentBox,
} from "../components/Common/Main/MainStyle";
import Allowance from "../components/Common/Main/Allowance";
import SpacialAllowance from "../components/Common/Main/SpacialAllowance";
import Qr from "../components/Common/Main/Qr";
import Money from "../assests/image/Money.png";
import RegistChild from "../modal/ChildCreate";
import ModalBody1 from "../modal/ModalBtn2";

function ParentsPage() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <ChildrenList>
        <ModalBody1
          modal_start_text="자녀추가"
          modal_title="자녀 등록하기"
          modal_content={<RegistChild />} /**테그 넣는 방법*/
          modal_btn1="생성"
          modal_btn2="취소"
          btn_justify="space-around"
        />
      </ChildrenList>
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
      <AllowanveContainer height="60%">
        <Allowance />
      </AllowanveContainer>
      <AllowanveContainer height="50%">
        <SpacialAllowance />
      </AllowanveContainer>
      <QrContainer>
        <Qr />
      </QrContainer>
    </MainContainer>
  );
}

export default ParentsPage;
