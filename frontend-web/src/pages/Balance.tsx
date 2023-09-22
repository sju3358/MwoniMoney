import React from "react";

import {
  MainContainer,
  TextContainer,
  BalanceContainer,
} from "../components/Common/Main/Main";

import BalanceCompo from "../components/Common/Balance/BalanceCompo";
import styled from "styled-components";
import { Text } from "../components/Common/About/AboutText";
import { WhiteBox } from "../components/Common/About/AboutWhilteContainer";
import { Img } from "../components/Common/About/AboutEmogi";
//이미지
import LeftArrow from "../assests/image/main/LeftArrow.png";
import Chat from "../assests/image/main/Chat.png";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
`;
const ImgBox = styled.button`
  border: 0;
  background-color: #ffffff;
  padding: 5%;
  border-radius: 50px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

function Balance() {
  return (
    <MainContainer>
      <BalanceContainer height="40%">
        <BalanceCompo showText={false} showImg={false} />
      </BalanceContainer>

      <ListContainer>
        <WhiteBox margin="0% 0% 5% 0%" padding="0%">
          <TextContainer style={{ justifyContent: "space-between" }}>
            <Text color="#C4C4C4" fontsize="0.75rem" padding="0% 0% 0% 5%">
              내일 축구는 누가 이길까요?
            </Text>
            <Img width="5%" height="5%" padding="0%" src={`${LeftArrow}`} />
          </TextContainer>
        </WhiteBox>
        <WhiteBox margin="0% 0% 5% 0%" padding="0%">
          <TextContainer style={{ justifyContent: "space-between" }}>
            <Text color="#C4C4C4" fontsize="0.75rem" padding="0% 0% 0% 5%">
              내일 야구는 누가 이길까요?
            </Text>
            <Img width="5%" height="5%" padding="0%" src={`${LeftArrow}`} />
          </TextContainer>
        </WhiteBox>
        <WhiteBox margin="0% 0% 5% 0%" padding="0%">
          <TextContainer style={{ justifyContent: "space-between" }}>
            <Text color="#C4C4C4" fontsize="0.75rem" padding="0% 0% 0% 5%">
              내일 농구는 누가 이길까요?
            </Text>
            <Img width="5%" height="5%" padding="0%" src={`${LeftArrow}`} />
          </TextContainer>
        </WhiteBox>
      </ListContainer>
      <ImgContainer>
        <ImgBox>
          <Img width="100%" height="100%" padding="0%" src={`${Chat}`} />
        </ImgBox>
      </ImgContainer>
    </MainContainer>
  );
}

export default Balance;
