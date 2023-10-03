// import React from "react";
// import ModalBody from "../../../modal/ModalBtn2";
// import styled from "styled-components";

// //recoil
// import { useRecoilState } from "recoil";
// import { payLoan } from "../../../states/LoanState";

// export const ContentBox = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   align-items: center;
//   box-sizing: border-box;
//   margin-top: 0%;
// `;

// export const InputDiv = styled.div`
//   width: 90%;
//   height: 30%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const InputInfo = styled.input`
//   border: none;
//   border-bottom: 1px solid black;
//   width: 95%;
//   height: 50%;
//   font-size: 1.3em;
//   outline: none;
// `;

// function LoanRepay() {
//   const [payLoanData, setpayLoanData] = useRecoilState(payLoan);

//   //input창 handle

//   const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newLoanAmount = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
//     setpayLoanData(newLoanAmount);
//   };
//   return (
//     <ContentBox>
//       <InputDiv>
//         <InputInfo
//           type="number"
//           name="payLoanData"
//           value={payLoanData}
//           placeholder="갚는 돈"
//           onChange={handleChangeState}
//         ></InputInfo>
//       </InputDiv>
//       <div>확인용</div>
//       <span>{payLoanData}</span>
//     </ContentBox>
//   );
// }

// export default LoanRepay;
