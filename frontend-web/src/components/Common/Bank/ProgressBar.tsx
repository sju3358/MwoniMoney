import React from "react";
import styled from "styled-components";
import { Text, TextBox } from "../About/AboutText";

interface BarProps {
  width?: string;
  height?: string;
  backcolor?: string;
}

const BackBar = styled.div<BarProps>`
  position: relative; /* 부모 컨테이너로부터 상대적 위치 설정 */
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#ededed"}; //"#f4f4f4"
  border-radius: 30px;
`;

const FrontBar = styled.div<BarProps>`
  position: absolute; /* 부모 컨테이너에 대해 상대적으로 배치 */
  top: 0; /* 위쪽으로 정렬 */
  left: 0; /* 왼쪽으로 정렬 */
  width: ${(props) => (props.width ? props.width : "30%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};
  z-index: 1; /* 다른 요소들 위에 표시 */
  border-radius: 30px;
`;

interface MeProps {
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
}

const Me = styled.div<MeProps>`
  width: ${(props) => (props.width ? props.width : "15%")};
  height: ${(props) => (props.height ? props.height : "70%")};
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  position: absolute;
  bottom: 20px;
  background-color: #fff3d1;
  border-radius: 30px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

interface ProgressBarProps {
  back_width?: string;
  back_height?: string;
  front_width?: string;
  front_height?: string;
  back_color?: string;
  front_color?: string;
  left_count?: number;
  right_count?: number;
  front_percent?: number;
  my_status?: string;
  amount?: number;
  balance?: number;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    back_width,
    back_height,
    front_width,
    front_height,
    back_color,
    front_color,
    amount = 0,
    balance = 0,
  } = props;
  const front_width_v2 = `${((amount - balance) / amount) * 100}%`;
  console.log(front_width_v2);
  return (
    <BackBar width={back_width} height={back_height} backcolor={back_color}>
      <FrontBar
        width={front_width_v2}
        height={front_height}
        backcolor={front_color}
      ></FrontBar>
    </BackBar>
  );
}

function ProgressBar_V1(props: ProgressBarProps) {
  const {
    back_width,
    back_height,
    front_width,
    front_height,
    back_color,
    front_color,
    left_count, //왼쪽 투표 수
    right_count, //오른쪽 투표 수
    front_percent,
    my_status,
  } = props;

  const backpercent: string = (100 - Number(front_percent)).toString();

  return (
    <BackBar
      width={back_width}
      height={back_height}
      backcolor={back_color}
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      {my_status === "0" ? (
        <></>
      ) : (
        <>
          <Me width="10%" height="70%">
            <Text>나</Text>
          </Me>
        </>
      )}
      <TextBox
        height="100%"
        flexDirection="column"
        marginL="0%"
        justifyContent="center"
        style={{ alignItems: "flex-end", padding: "0% 12% 0% 0%" }}
      >
        <Text margin="0% 0% 0% 70%" fontsize="0.75rem" padding="0% 0% 1% 0%">
          {backpercent}%
        </Text>

        <Text margin="0% 0% 0% 70%" fontsize="0.625rem" color="#9F9F9F">
          {right_count}
        </Text>
      </TextBox>
      <FrontBar
        width={front_width}
        height={front_height}
        backcolor={front_color}
      >
        {my_status === "0" ? (
          <>
            <Me>
              <Text>나</Text>
            </Me>
          </>
        ) : (
          <></>
        )}

        <TextBox
          height="100%"
          flexDirection="column"
          marginL="0%"
          justifyContent="center"
          style={{ alignItems: "flex-end", padding: "0% 5% 0% 0%" }}
        >
          <Text
            padding="0% 0% 1% 0%"
            fontsize="0.75rem"
            style={{ zIndex: "-1" }}
          >
            {front_width}
          </Text>
          <Text fontsize="0.625rem" color="#9F9F9F" style={{ zIndex: "-1" }}>
            {left_count}
          </Text>
        </TextBox>
      </FrontBar>
    </BackBar>
  );
}

export { ProgressBar, ProgressBar_V1 };
