import React from "react";
import styled from "styled-components";
import Money from "../../assests/image/Money.png";

const MainContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

const ChildrenList = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 15%;
  box-sizing: border-box;
`;

{
  /* Text 넣는 칸 */
}

const TextContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
`;
const TextMentBox = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: baseline;
`;

const Text = styled.div`
  // border: 1px solid blue;
  color: #292929;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5%;
`;

const TextEmojiBox = styled.div`
  // border: 1px solid red;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  background-image: url(${Money});
  background-size: 100% 100%;
`;

{
  /* 정기용돈 넣는 칸 */
}

const AllowanveContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  // border: 1px solid black;
  border-radius: 8px;
  width: 90%;
  height: 90%;
  background-color: #ffffff;
`;

{
  /* 특별용돈 넣는 칸 */
}

{
  /* QR 넣는 칸 */
}

const QrContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ParentsMain() {
  const childName = "지현"; // api연결시 자녀1 이름으로 매핑
  const childAllowance = 100000;
  return (
    <MainContainer>
      <ChildrenList />
      <TextContainer>
        <TextMentBox>
          <Text>현재 {childName}는</Text>
          <Text>매달 {childAllowance}원을 </Text>
          <Text>받고 있어요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </TextContainer>
      <AllowanveContainer>
        <WhiteBox />
      </AllowanveContainer>
      <AllowanveContainer>
        <WhiteBox />
      </AllowanveContainer>
      <QrContainer>
        <WhiteBox />
      </QrContainer>
    </MainContainer>
  );
}

export default ParentsMain;
