import React from "react";
import styled from "styled-components";

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
    props.backcolor ? props.backcolor : "#f4f4f4"};
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
80`;

function ProgressBar() {
  return (
    <BackBar>
      <FrontBar />
    </BackBar>
  );
}

export default ProgressBar;
