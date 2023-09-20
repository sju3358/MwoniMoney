import React from "react";
import styled from "styled-components";

const Container = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 100%; /* 화면 너비에 맞게 컨테이너 크기 설정 */
  height: 100%; /* 화면 높이에 맞게 컨테이너 크기 설정 */
  display: flex;
  flex-direction: column;
  border: solid;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  border: solid;
  box-sizing: border-box;
  padding: 10%;
`;

const InTextContainer1 = styled.div`
  width: 80%;
  height: 100%;
`;

const InTextContainer2 = styled.div`
  width: 20%;
  height: 100%;
`;

const Chart = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  background-image: url(${process.env.PUBLIC_URL}/images/MoneyPage/Chart.png);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`;


const Text = styled.div`
  color: #292929;
  font-family: Inter;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BlockContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  border: solid;
  box-sizing: border-box;
  padding: 5% 10%;
  justify-content: space-between;
`;

const Block1 = styled.div`
  width: 45%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--status-good, #B9DEB3);
  border: solid;
  box-sizing: border-box;
  padding: 4% 7%;
`;

const Block2 = styled.div`
  width: 45%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--status-bad, #FFA27E);
  border: solid;
  box-sizing: border-box;
  padding: 4% 7%;
`;

const BlockTextBox1 = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const BlockText = styled.div`
  color: #292929;
  font-family: Inter;
  font-size: 3.5vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ContextContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  border: solid;
  box-sizing: border-box;
  padding: 3% 10%;
  border-radius: 5px;
`;

const ContextContainerIn = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  border: solid;
  box-sizing: border-box;
  padding: 2% 10%;
`;

const CostText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CostCategoryContainer = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CostCategory = styled.div`
  color: var(--text-color-active, #292929);
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

function MoneyPage() {
  return (
    <Container>
      <TextContainer>
        <InTextContainer1>
          <Text>민재가</Text>
          <Text>현재까지 사용한 금액을</Text>
          <Text>확인해보세요!</Text>
        </InTextContainer1>
        <InTextContainer2>
          <Chart/>
        </InTextContainer2>
      </TextContainer>
      <BlockContainer>
        <Block1>
          <BlockTextBox1>
            <BlockText>수입</BlockText>
          </BlockTextBox1>
          <BlockTextBox1>
            <BlockText>+ 100, 000원</BlockText>
          </BlockTextBox1>
        </Block1>
        <Block2>
        <BlockTextBox1>
            <BlockText>지출</BlockText>
          </BlockTextBox1>
          <BlockTextBox1>
            <BlockText>- 100, 000원</BlockText>
          </BlockTextBox1>
        </Block2>
      </BlockContainer>
      <ContextContainer>
        <ContextContainerIn>
          <CostText>지출내역</CostText>
        </ContextContainerIn>
      </ContextContainer>
    </Container>
  );
}

export default MoneyPage;
