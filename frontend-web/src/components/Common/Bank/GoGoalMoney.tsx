import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { TextBox } from "../About/AboutText";
import { EmogiBox } from "../About/AboutEmogi";
import Pig from "../../../assests/image/Pig.png";
import { useNavigate } from "react-router";
import api from "../../../apis/Api";
import { useRecoilState } from "recoil";
import { userDataState } from "../../../states/UserInfoState";

interface HalfBoxProps {
  width?: string;
  height?: string;
  flexDirection?: string;
}

const HalfBox = styled.div<HalfBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "50%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: center;
  align-items: center;
`;

function GoGoalMoney() {
  const [userData, setUserData] = useRecoilState(userDataState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("v1/members", {});
        const receivedData = response.data;
        console.log(receivedData);
        setUserData((prev) => ({
          ...prev,
          name: receivedData.name,
          memberRole: receivedData.memberRole,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const [childData, setChildData] = useState<any[]>([]);

  let ChildName: string | null = null;
  const childStateString: string | null = localStorage.getItem("childState");

  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    ChildName = childState.childDataState.name;
    // console.log(ChildName);
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  const role = userData.memberRole;
  const childName = ChildName;
  const userName = userData.name;
  const navigate = useNavigate();
  const GoGoalMoney = () => {
    navigate("/GoalMoney");
  };

  return (
    <WhiteBox1 height="90%" onClick={GoGoalMoney}>
      <HalfBox
        width="70%"
        flexDirection="column"
        style={{ padding: "5% 0% 5% 0%" }}
      >
        <TextBox fontF="TheJamsil7Bold" marginL="20%" fontSize="2em">
          짜금통
        </TextBox>
        {role === "CHILD" ? (
          <TextBox marginL="20%" height="25%" fontSize="1em">
            이번주 {userName}님이
          </TextBox>
        ) : (
          <TextBox marginL="20%" height="25%" fontSize="1em">
            이번주 {childName}님이
          </TextBox>
        )}

        <TextBox marginL="20%" height="25%" fontSize="1em">
          모은 금액을 확인해보세요
        </TextBox>
      </HalfBox>
      <HalfBox width="30%">
        <EmogiBox backImg={Pig} />
      </HalfBox>
    </WhiteBox1>
  );
}

export default GoGoalMoney;
