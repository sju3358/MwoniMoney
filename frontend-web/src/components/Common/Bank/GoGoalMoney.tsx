import React, { useEffect } from "react";
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
        setUserData((prev) => ({
          ...prev,
          name: receivedData.name,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const childName = userData.name;
  const navigate = useNavigate();
  const GoGoalMoney = () => {
    navigate("/GoalMoney");
  };

  return (
    <WhiteBox1 onClick={GoGoalMoney}>
      <HalfBox width="70%" flexDirection="column">
        <TextBox fontSize="2em">짜금통</TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
          이번주 {childName}님이
        </TextBox>
        <TextBox height="25%" fontSize="1em" fontWeight="normal">
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
