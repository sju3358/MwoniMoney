import React, { useEffect, useState } from "react";
import { Container } from "../components/Common/About/AboutContainer";
import { TextBox } from "../components/Common/About/AboutText";
import GoGoalMoney from "../components/Common/Bank/GoGoalMoney";
import BankGraph from "../components/Common/Bank/BankGraph";
import Card from "../components/Common/Bank/Card";
import CategoryTag from "../components/Common/About/AboutCategory";
import LoanList from "../components/Common/Bank/LoanList";
import LoanAdd from "../components/Common/Bank/LoanAdd";
import { Text } from "../components/Common/About/AboutText";

//recoil
import { useRecoilState } from "recoil";
import { userDataState } from "../states/UserInfoState";
import { childDataState, childDataProps } from "../states/ChildInfoState";
//loan
import { LoanStore } from "../states/LoanState";

//카테고리 버튼 클릭
import { isButtonLoan } from "../states/LoanState";
//카테고리 조회
import { isCategoryLoan, whichCategoryLoan } from "../states/LoanState";
import { isProposeLoan, isRepayLoan } from "../states/LoanState";

//axios
import api from "../apis/Api";

//moneyformat
import { moneyFormat } from "../components/Common/utils";

import { totalLoan } from "../states/LoanState";
import { MainContainer } from "../components/Common/Main/MainStyle";

function Bank() {
  //childName
  const [selectedChild, setSelectedChild] =
    useRecoilState<childDataProps>(childDataState);
  let childName: string | null = null;
  let childUuid: string | null = null;
  let score: number | null = null;
  let loanMemberType = "";
  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;
  const userStateString: string | null = localStorage.getItem("userState");
  const childStateString: string | null = localStorage.getItem("childState");
  //신용점수

  if (role === "PARENT") {
    if (childStateString !== null) {
      const childState = JSON.parse(childStateString);
      score = childState.childDataState.creditScore;
      console.log(score);
    } else {
      console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
    }
    childName = selectedChild.name;
    childUuid = selectedChild.uuid;
    loanMemberType = "LENDER";
  } else {
    loanMemberType = "BORROWER";
    childUuid = "none";
    if (userStateString !== null) {
      const userState = JSON.parse(userStateString);
      childName = userState.userDataState.name;
      score = userState.userDataState.creditscore;
      console.log(childName);
    } else {
      console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
    }
  }

  /**
   * loanList값
   */
  const [LoanData, setLoanData] = useRecoilState(LoanStore);
  //카테고리 버튼
  const [isCategoryState, setisCategoryState] = useRecoilState(isCategoryLoan);
  const [whichCategoryState, setwhichCategoryState] =
    useRecoilState(whichCategoryLoan);
  const [isProposeState, setisProposeState] = useRecoilState(isProposeLoan);
  const [isRepayState, setisRepayState] = useRecoilState(isRepayLoan);
  const [isButtonState, setIsButtonState] = useRecoilState(isButtonLoan);
  let status_value: string;

  if (isCategoryState) {
    status_value = whichCategoryState;
  } else {
    status_value = "GENERAL";
  }

  //get axios로 loan list로 받아오기
  const page = 0;
  const size = 10;

  const [totalData, setTotalData] = useState({
    avgInterest: 0,
    totalAmount: 0,
    totalBalance: 0,
    totalInterest: 0,
  });

  //데이터 총 개수
  const [totalLoanData, setTotalLoanData] = useRecoilState(totalLoan);
  if (status_value === "GENERAL") {
    setTotalLoanData(LoanData.length);
  }

  useEffect(() => {
    console.log(status_value);

    api
      .get(`/v1/loans/total?childUuid=${childUuid}`)
      .then((res) => {
        console.log(res);
        setTotalData({
          avgInterest: res.data.avgInterest,
          totalAmount: res.data.totalAmount,
          totalBalance: res.data.totalBalance,
          totalInterest: res.data.totalInterest,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get(
        `/v1/loans?page=${page}&size=${size}&loanListRequestStatus=${status_value}&loanMemberType=${loanMemberType}&childUUID=${childUuid}`
      )
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("GET 요청 성공:", response.data.content);
        setLoanData(response.data.content);
        /**
         *
         */
        setisProposeState(false);
        setIsButtonState(false);
        console.log("대출 데이터 : ", totalLoanData);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        if (error.response) {
          // 서버에서 응답이 왔지만, 응답 상태 코드가 실패인 경우
          console.error("GET 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          // 서버로 요청을 보내지 못한 경우
          console.error("GET 요청 실패 - 요청을 보낼 수 없음");
        } else {
          // 요청 준비 과정에서 에러가 발생한 경우
          console.error("GET 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  }, [isProposeState, isButtonState, whichCategoryState, isRepayState]);

  // Container
  // style={{ overflow: "auto" }}
  // width="100%"
  // height="100%"
  // flexDirection="column"

  return (
    <MainContainer>
      {/* Title */}
      <Container height="20%" flexDirection="column">
        <TextBox marginL="9%">현재 {childName}님은</TextBox>
        {/* <TextBox>{moneyFormat(totalData.totalBalance)}만큼의</TextBox> */}
        <TextBox marginL="9%">
          {moneyFormat(totalData.totalBalance)}만큼의
        </TextBox>
        <TextBox marginL="9%">빚이 있어요!</TextBox>
      </Container>

      {/* GoGoalMoney */}
      <Container height="25%" align="flex-end">
        <GoGoalMoney />
      </Container>

      {/* GraphContainer */}
      <Container height="50%" overflowy="hidden">
        <BankGraph
          avgInterest={totalData.avgInterest}
          creditScore={score}
          color="#5963e6"
        />
      </Container>

      {/* CardContainer */}
      <Card
        principal={totalData.totalAmount}
        interest={totalData.totalInterest}
      />

      {/* CategoryContainer */}
      <Container height="10%">
        <CategoryTag content1="모두" content2="대출중" content3="제안대기" />
      </Container>
      {/* LoanModal */}
      {/* LoanList */}
      <Container height="80%">
        <Container
          height="100%"
          flexDirection="column"
          justifyContent="flex-start"
          // style={{ border: "1px solid blue" }}
          overflowy="auto"
          // marginB="100%"
        >
          {role === "PARENT" && totalLoanData < 4 ? <LoanAdd /> : <></>}
          <>
            {LoanData.length > 0 ? (
              <>
                {LoanData.map((loan) => (
                  <LoanList data={loan} key={loan.idx} />
                ))}
              </>
            ) : (
              <>
                {status_value === "GENERAL" && (
                  <Container height="80%">
                    <Text>현재 대출 내역이 없어요.</Text>
                  </Container>
                )}
                {status_value === "APPROVAL" && (
                  <Container height="80%">
                    <Text>현재 진행중인 대출이 없어요.</Text>
                  </Container>
                )}
                {status_value === "WATING" && (
                  <Container height="80%">
                    <Text>현재 제안대기중인 대출이 없어요.</Text>
                  </Container>
                )}
              </>
            )}
          </>
        </Container>
      </Container>
      {/* </div> */}
    </MainContainer>
  );
}

export default Bank;
