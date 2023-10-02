import React, { useEffect } from "react";
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

//axios
import api from "../apis/Api";

//moneyformat
import { moneyFormat } from "../components/Common/utils";

function Bank() {
  //childName
  const [selectedChild, setSelectedChild] =
    useRecoilState<childDataProps>(childDataState);
  let childName: string | null = null;
  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;
  const userStateString: string | null = localStorage.getItem("userState");
  if (role === "PARENT") {
    childName = selectedChild.name;
  } else {
    if (userStateString !== null) {
      const userState = JSON.parse(userStateString);
      childName = userState.userDataState.nickname;
      console.log(childName);
    } else {
      console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
    }
  }

  //
  const debt = 10000;
  //신용점수
  const score = 50;

  /**
   * loanList값
   */
  const [LoanData, setLoanData] = useRecoilState(LoanStore);

  //get axios로 loan list로 받아오기
  useEffect(() => {
    api
      .get("url보내기")
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("GET 요청 성공:", response.data);
        setLoanData(response.data);
        /**
         *
         */
        // setisProposeState(false);
        // setIsButtonState(false);
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
  }, []);
  // }, [isProposeState, isButtonState, whichCategoryState]);

  return (
    <>
      {/* Title */}
      <Container height="15%" flexDirection="column">
        <TextBox>현재 {childName}님은</TextBox>
        <TextBox>{moneyFormat(debt)}만큼의</TextBox>
        <TextBox>빚이 있어요!</TextBox>
      </Container>

      {/* GoGoalMoney */}
      <Container height="20%">
        <GoGoalMoney />
      </Container>

      {/* GraphContainer */}
      <Container height="55%" overflowy="hidden">
        <BankGraph creditScore={score} color="#5963e6" />
      </Container>

      {/* CardContainer */}
      <Card />

      {/* CategoryContainer */}
      <Container height="10%">
        <CategoryTag content1="모두" content2="대출중" content3="제안대기" />
      </Container>
      {/* LoanModal */}
      <Container height="100%" flexDirection="column">
        {role === "PARENT" ? <LoanAdd /> : <></>}
        {/* <LoanList />
        <LoanList />
        <LoanList /> */}
        <>
          {LoanData.length > 0 ? (
            <>
              {LoanData.map((loan) => (
                <LoanList data={loan} key={loan.memberLoanIdx} />
              ))}
            </>
          ) : (
            <Text>현재 진행중인 대출이 없어요.</Text>
          )}
        </>
      </Container>
      {/* </div> */}
    </>
  );
}

export default Bank;
