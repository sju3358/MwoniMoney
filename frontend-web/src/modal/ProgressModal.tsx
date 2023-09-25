import * as React from "react";
import ModalBody from "../modal/ModalBtn1";
import styled from "styled-components";
import ProgressBar from "../components/Common/Bank/ProgressBar";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
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
  width: 100%;
  height: 30%;
  border: 1px solid black;
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

function Main() {
  const frontPercent = 50; // 숫자값으로 설정
  const frontWidth = `${frontPercent}%`; // "%"를 붙여주기
  const backWidth = `calc(100% - ${frontWidth})`; // 100%에서 frontPercent를 뺀 값
  const backPercent = 100 - frontPercent; // 숫자값으로 설정

  return (
    <ModalContainer>
      <Container height="80%">
        <ProgressBarContainer>
          <ProgressBar
            front_width={frontWidth}
            back_height="50%"
            back_width="80%" // 계산된 값을 전달
            front_height="100%"
          ></ProgressBar>
        </ProgressBarContainer>
        <BigText>{`${frontPercent}% VS ${backPercent}%`}</BigText>
        <BigText>Yes VS NO</BigText>
        <ContentContainer>
          <BigText>글로벌 기업 ABC가</BigText>
          <BigText>새로운 혁신 제품을 발표하고</BigText>
          <BigText>시장에서 큰 관심을 받고 있습니다.</BigText>
        </ContentContainer>
      </Container>
    </ModalContainer>
  );
}

export default function BasicModal() {
  return (
    <div>
      <ModalBody
        modal_start_text="모달 띄우는 버튼에 적을 말"
        modal_title="어느 쪽이 많을까요?"
        modal_content={<Main />}
        modal_btn="닫기"
      />
    </div>
  );
}
