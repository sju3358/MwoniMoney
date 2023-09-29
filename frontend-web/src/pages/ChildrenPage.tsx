import React from "react";
import {
  Emoji,
  MainContainer,
  TextEmojiBox,
} from "../components/Common/Main/MainStyle";
import { Container } from "../components/Common/About/AboutContainer";
import { TextBox } from "../components/Common/About/AboutText";
//컴포넌트
import BalanceCompo, {
  Img_no,
} from "../components/Common/Balance/BalanceCompo";
import Quiz from "../components/Common/Quiz/Quiz";
import Challenge from "../components/Children/Challenge";

//이미지
import Coin from "../assests/image/main/Coin.png";

// 함수
import { useNavigate } from "react-router-dom";

function ChildrenPage() {
  const navigate = useNavigate();
  const goBank = () => {
    navigate("/Bank");
  };
  const goMoneyPage = () => {
    navigate("/MoneyPage");
  };
  const userName = "지현이";
  const asset = "100,000원";
  const debt = "10,000원";
  return (
    <MainContainer>
      {/* 메인 타이틀 컨테이너 */}
      <Container height="20%">
        <Container
          height="100%"
          width="80%"
          flexDirection="column"
          align="start"
        >
          <Container height="30%">
            <TextBox height="100%">{userName}는 지금</TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              잔액 {asset}
            </TextBox>
          </Container>
          <Container height="20%">
            <TextBox fontSize="1.1em" marginL="10%" height="100%" width="95%">
              채무 {debt}
            </TextBox>
          </Container>
        </Container>
        <TextEmojiBox>
          <Emoji url={`${Coin}`} width="80%" height="40%" />
        </TextEmojiBox>
      </Container>

      {/* 통장잔고 컨테이너 */}
      {/* <Container height="25%"></Container> */}

      {/*주요기능 컴포넌트 컨테이너*/}
      <Container height="50%">
        <BalanceCompo
          showText={true}
          showImg={true}
          questionText="ABC 기업의 주식을 구매하시겠습니까?"
          buyText="산다"
          notBuyText="안산다"
        />
      </Container>
      <Container height="50%" overflowy="hidden">
        <Quiz />
      </Container>
      <Container height="50%">
        <Challenge ismain="Y" />
      </Container>
    </MainContainer>
  );
}

export default ChildrenPage;
