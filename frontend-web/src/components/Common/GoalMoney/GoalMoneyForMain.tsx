import React from "react";
import { WhiteBox } from "../About/AboutWhilteContainer";
import { useNavigate } from "react-router-dom";
import { ImgBox, Img } from "../About/AboutEmogi";
import Pig from "../../../assests/image/Pig.png";
import { Text } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { useRecoilState } from "recoil";
import { userDataState } from "../../../states/UserInfoState";

function GoalForMain() {
  // 자녀 정보 받아오기
  let ChildName: string | null = null;
  let GoalName: string | null = null;
  const childStateString: string | null = localStorage.getItem("childState");

  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    ChildName = childState.childDataState.name;
    GoalName = childState.childDataState.goalName;
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  const name = ChildName;
  const item = GoalName;
  const [userData] = useRecoilState(userDataState);
  const role = userData.memberRole;
  const navigate = useNavigate();

  const GoGoalMoney = () => {
    navigate("/GoalMoney");
  };
  console.log(item === undefined);

  return (
    <WhiteBox height="90%" onClick={GoGoalMoney}>
      <ImgBox>
        <Img src={`${Pig}`} width="30%" height="30%" />
      </ImgBox>
      <Container height="60" flexDirection="column" marginT="10%">
        {role === "PARENT" ? (
          <>
            <Text
              fontF="TheJamsil7Bold"
              fontsize="1.5rem"
              padding="0% 0% 5% 0%"
            >
              {name}님이
            </Text>
            {item === undefined ? (
              <>
                <Text
                  fontF="TheJamsil7Bold"
                  fontsize="1.5rem"
                  padding="0% 0% 5% 0%"
                >
                  모으고 있는
                </Text>
                <Text
                  fontF="TheJamsil7Bold"
                  fontsize="1.5rem"
                  padding="0% 0% 5% 0%"
                >
                  짜금통이 없어요!
                </Text>
              </>
            ) : (
              <>
                <Text
                  fontF="TheJamsil7Bold"
                  fontsize="1.5rem"
                  padding="0% 0% 5% 0%"
                >
                  {item}을 위해
                </Text>
                <Text
                  fontF="TheJamsil7Bold"
                  fontsize="1.5rem"
                  padding="0% 0% 5% 0%"
                >
                  짜금통을 모으고 있어요!
                </Text>
              </>
            )}
          </>
        ) : (
          <>
            <Text
              fontF="TheJamsil7Bold"
              fontsize="1.5rem"
              padding="0% 0% 5% 0%"
            >
              {item}을 위해
            </Text>
            <Text
              fontF="TheJamsil7Bold"
              fontsize="1.5rem"
              padding="0% 0% 5% 0%"
            >
              짜금통을 모으고 있어요!
            </Text>
          </>
        )}
      </Container>
    </WhiteBox>
  );
}

export default GoalForMain;
