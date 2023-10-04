import React from "react";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import { EmogiBox } from "../About/AboutEmogi";
import Chart from "../../../assests/image/MoneyPage/Chart.png";
import { Category } from "../About/AboutCategory";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import AboutCard from "../About/AboutCard";
import MoneyTable from "./MoneyTable";
import Income from "../../../assests/image/MoneyPage/MoneyBag.png";
import { useRecoilState } from "recoil";
import { childDataState, childDataProps } from "../../../states/ChildInfoState";

function MoneyChildPage() {
  const [selectedChild, setSelectedChild] =
    useRecoilState<childDataProps>(childDataState);

  const child = selectedChild.name;
  const inCome = 100000;
  const outCome = 129000;
  return (
    <>
      {/* 맨 상단 타이틀 */}
      <Container height="25%">
        <Container width="75%" height="100%" flexDirection="column">
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            {child}님이
          </TextBox>
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            현재까지 사용한 금액을
          </TextBox>
          <TextBox fontSize="1.4em" height="25%" marginL="10%">
            확인해보세요!
          </TextBox>
        </Container>
        <Container width="25%" height="100%">
          <EmogiBox backImg={`${Chart}`} width="50%" height="50%" />
        </Container>
      </Container>
      {/* 수입지출 카드 */}
      <Container height="20%" justifyContent="space-around">
        <AboutCard
          width="40%"
          title1="수입"
          title2="지출"
          content1={`+ ${inCome}`}
          content2={`- ${outCome}`}
          backcolor1="#b9deb3"
          backcolor2="#ffa27e"
          fontsize1="1.3em"
          fontsize2="1.1em"
          fontweight="bold"
        />
      </Container>
      {/* 지출내역 리스트 */}
      <Container height="53%" style={{ minHeight: "400px" }}>
        <WhiteBox1
          flexDirection="column"
          height="95%"
          style={{ overflowY: "auto" }}
        >
          {/* 제목 */}
          <Container height="13%">
            <TextBox height="100%">지출내역</TextBox>
          </Container>
          {/* 카테고리 */}
          <Container height="13%" justifyContent="start">
            <Category backcolor="#f4f4f4">전체</Category>
            <Category backcolor="#b9deb3">수익</Category>
            <Category backcolor="#ffa27e">지출</Category>
          </Container>
          <Container
            style={{ border: "1px solid red" }}
            height="500px"
            flexDirection="column"
          >
            <MoneyTable
              emogi={`${Income}`}
              expense_detail="지출내역"
              expense_date="지출날짜"
              spending={100000}
            />
            <MoneyTable
              emogi={`${Income}`}
              expense_detail="지출내역"
              expense_date="지출날짜"
              spending={100000}
            />
            <MoneyTable
              emogi={`${Income}`}
              expense_detail="지출내역"
              expense_date="지출날짜"
              spending={100000}
            />
            <MoneyTable
              emogi={`${Income}`}
              expense_detail="지출내역"
              expense_date="지출날짜"
              spending={100000}
            />
            <MoneyTable
              emogi={`${Income}`}
              expense_detail="지출내역"
              expense_date="지출날짜"
              spending={100000}
            />
          </Container>
        </WhiteBox1>
      </Container>
    </>
  );
}

export default MoneyChildPage;
