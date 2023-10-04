import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: "userUuidState",
//   storage: localStorage,
// });

interface newLoanProps {
  borrowerUUID: string;
  status: string;
  name: string; //대출명
  content: string; //내용
  amount: number; //대출금
  deadline: string; //상환날짜
  rate: number; //대출금리
  // everykey: string; //매달,매주
  // everyvalue: string; //string or number
}

//input에서 넣은 post용 데이터
export const newLoan = atom<newLoanProps>({
  key: "new_loan",
  default: {
    borrowerUUID: "",
    status: "",
    name: "",
    content: "",
    amount: 0,
    deadline: "",
    rate: 0,
  },
  // effects_UNSTABLE: [persistAtom],
});

export interface getLoan {
  amount: number;
  borrower: number;
  content: string;
  deadline: string;
  idx: number;
  lender: number;
  name: string;
  rate: number;
  status: string;
  balance: number;
}

export const LoanStore = atom<getLoan[]>({
  key: "laon_store",
  default: [],
});

// 대출을 제안/생성했는지
export const isProposeLoan = atom<boolean>({
  key: "is_propose_loan",
  default: false,
});

//대출의 버튼이 클릭되어있는지
export const isButtonLoan = atom<boolean>({
  key: "is_button_loan",
  default: false,
});

//대출 카테고리 버튼이 클릭되어있는지
export const isCategoryLoan = atom<boolean>({
  key: "is_category_loan",
  default: false,
});

//대출 카테고리 버튼이 클릭되어있는지
export const whichCategoryLoan = atom<string>({
  key: "which_category_loan",
  default: "",
});

//대출금
export const payLoan = atom<number>({
  key: "payLoan",
  default: 0,
});

export const isRepayLoan = atom<boolean>({
  key: "is_repay_loan",
  default: false,
});

//총데이터 
export const totalLoan = atom<number>({
  key: "totalLoan",
  default: 0,
});
