import React from "react";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { ListTitle, CategoryTag, DeadLine } from "../Challenge/ChallengeList";
import { Category } from "../About/AboutCategory";
import { TextBox } from "../About/AboutText";
import Button from "../About/AboutButton";
import { ProgressBar } from "./ProgressBar";
import { Text } from "../About/AboutText";
import styled from "styled-components";

//recoil
import { useRecoilState } from "recoil";
import { userDataState } from "../../../states/UserInfoState";
import { getLoan } from "../../../states/LoanState";
import { isButtonLoan } from "../../../states/LoanState";

//utils
import { dateFormat } from "../utils";

//axios
import api from "../../../apis/Api";

import { useNavigate } from "react-router-dom";

//repay
// import LoanRepay from "./LoanRepay";
import ModalPayLoan from "../../../modal/Loan/ModalPayLoan";

export const ListBtn = styled.div`
  // border: 1px solid green;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface Props {
  data: getLoan;
}
function LoanList({ data }: Props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;

  //자식의 memberLoanidx
  const LoanIdx = data.idx;

  //챌린지 리스트의 버튼이 클릭되어있는지
  const [isButtonState, setIsButtonState] = useRecoilState(isButtonLoan);

  //자식이 부모의 대출 수락
  const handleAccept = () => {
    api
      .patch(`/v1/loans/approval/${LoanIdx}`)
      .then((response) => {
        console.log("자식 대출 수락");
        setIsButtonState(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "로그인 되어있지 않습니다.") {
          navigate("/LoginPage");
        }
      });
  };
  const handleReject = () => {
    api
      .patch(`/v1/loans/rejection/${LoanIdx}`)
      .then((response) => {
        console.log("자식 대출 거절");
        setIsButtonState(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "로그인 되어있지 않습니다.") {
          navigate("/LoginPage");
        }
      });
  };

  /////// Repay모달
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    // <Container
    //   width="90%"
    //   height="100%"
    //   overflowy="hidden"
    //   style={{ backgroundColor: "yellow", border: "1px solid red" }}
    // >
    <WhiteBox1
      style={{ borderRadius: "15px", marginBottom: "20px" }}
      height="25%"
      width="90%"
      flexDirection="column"
    >
      <Container height="40%">
        <ListTitle>
          <TextBox width="50%" marginL="0%" fontSize="1.1em" height="100%">
            {data.content}
          </TextBox>
          <CategoryTag>
            {data.status === "APPROVAL" && (
              <Category backcolor="#fcdf92" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="600">
                  대출중
                </Text>
              </Category>
            )}
            {data.status === "REJECTION" && (
              <Category backcolor="#FFA27E" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="600">
                  거절
                </Text>
              </Category>
            )}
            {data.status === "WATING" && (
              <Category backcolor="#d1d1d1" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="600">
                  제안대기
                </Text>
              </Category>
            )}
            {data.status === "PAID" && (
              <Category backcolor="#B9DEB3" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="600">
                  다 갚음
                </Text>
              </Category>
            )}
            {/* {data.status === 0 && (
              <Category backcolor="#fcdf92" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  만료됨
                </Text>
              </Category>
            )} */}
          </CategoryTag>
          <DeadLine>~ {dateFormat(data.deadline)}</DeadLine>
        </ListTitle>
      </Container>
      <Container height="20%">
        <ProgressBar amount={data.amount} balance={data.balance} />
      </Container>
      <Container height="40%">
        {role === "PARENT" ? (
          <></>
        ) : (
          <>
            {data.status === "APPROVAL" && (
              <>
                <Button
                  content="돈 갚기"
                  width="50%"
                  fontS="1.2em"
                  height="70%"
                  click={handleOpen}
                />
                <ModalPayLoan
                  loanidx={LoanIdx}
                  balance={data.balance}
                  useState_open={open}
                  set_open={setOpen}
                  modal_title="대출 갚기"
                  modal_btn1="갚기"
                  modal_btn2="취소"
                  btn_justify="space-around"
                />
              </>
            )}
            {data.status === "WATING" && (
              <ListBtn>
                <Button
                  content="수락"
                  width="50%"
                  fontS="1.2em"
                  height="70%"
                  click={handleAccept}
                />
                <Button
                  backcolor="#f4f4f4"
                  content="거절"
                  width="50%"
                  fontS="1.2em"
                  height="70%"
                  click={handleReject}
                />
              </ListBtn>
            )}
          </>
        )}
      </Container>
    </WhiteBox1>
    // </Container>
  );
}

export default LoanList;
