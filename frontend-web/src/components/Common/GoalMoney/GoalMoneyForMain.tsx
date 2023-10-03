import React from "react";
import { WhiteBox } from "../About/AboutWhilteContainer";
import { useNavigate } from "react-router-dom";
import { ImgBox, Img } from "../About/AboutEmogi";
import Item from "../../../assests/image/Item.png";
import { Text } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { useRecoilState } from "recoil";
import { userDataState } from "../../../states/UserInfoState";

function GoalForMain() {
  const name = "기택";
  const item = "게임기";
  const money = "100,1000";
  const date = "2023.09.13";
  const rate = "0.1";

  //number = 1 : 부모 , number = 0 : 자식
  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;
  const navigate = useNavigate();

  const GoGoalMoney = () => {
    navigate("/GoalMoney");
  };
  return (
    <WhiteBox height="90%" onClick={GoGoalMoney}>
      <ImgBox>
        <Img src={`${Item}`} width="35%" height="35%" />
      </ImgBox>
      <Container height="60" flexDirection="column" marginT="10%">
        {role === "PARENT" ? (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {name}님이
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {item}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {money}원을 모았어요!
            </Text>
          </>
        ) : (
          <>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {item}을 위해
            </Text>
            <Text fontsize="1.5rem" fontweight="700" padding="0% 0% 5% 0%">
              {money}원을 모았어요!
            </Text>
          </>
        )}
      </Container>
    </WhiteBox>
  );
}

export default GoalForMain;
