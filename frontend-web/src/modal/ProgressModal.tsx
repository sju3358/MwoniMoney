import * as React from "react";
import ModalBody from "../modal/ModalBtn1";
import styled from "styled-components";
// import ProgressBar from "../components/Common/Bank/ProgressBar";
import { ProgressBar_V1 } from "../components/Common/Bank/ProgressBar";

const ModalContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  // border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  margin: 20px 0; /* 간격을 조절할 수 있는 margin 설정 */
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상 설정 */
  font-size: 24px; /* 텍스트 크기 설정 */
`;

const ProgressBarContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: column; /* 내부 요소들을 세로로 배치 */
`;

const BigText = styled.div`
  color: var(--text-color-active, #292929);

  /* content/title/mid */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center; /* 텍스트 가운데 정렬 추가 */
`;

export default function balanceResult() {
  //투표수가 많다고 노란색이 아니라 내가 선택한 쪽이 노란색
  const myStatus = "1"; //0이면 왼쪽, 1이면 오른쪽
  const leftCount = "70";
  const rightCount = "30";
  const frontPercent: string = (
    (Number(leftCount) / (Number(leftCount) + Number(rightCount))) *
    100
  ).toString();
  const frontWidth = `${frontPercent}%`; // "%"를 붙여주기
  // const backWidth = `calc(100% - ${frontWidth})`; // 100%에서 frontPercent를 뺀 값
  // const backPercent = 100 - frontPercent; // 숫자값으로 설정

  return (
    <ModalContainer>
      <Container height="80%">
        <ProgressBarContainer>
          <ProgressBar_V1
            front_width={frontWidth}
            back_height="50%"
            back_width="80%" // 계산된 값을 전달
            front_height="100%"
            left_count={leftCount}
            right_count={rightCount}
            front_percent={frontPercent}
            my_status={myStatus}
          ></ProgressBar_V1>
        </ProgressBarContainer>

        <ContentContainer>
          <BigText>글로벌 기업 ABC가</BigText>
          <BigText>새로운 혁신 제품을 발표하고</BigText>
          <BigText>시장에서 큰 관심을 받고 있습니다.</BigText>
        </ContentContainer>
      </Container>
    </ModalContainer>
  );
}

// export default function ProgressModal() {
//   return (
//     <ModalBody
//       modal_start_text="모달 띄우는 버튼에 적을 말"
//       modal_title="어느 쪽이 많을까요?"
//       modal_content={<Main />}
//       modal_btn="닫기"
//     />
//   );
// }
