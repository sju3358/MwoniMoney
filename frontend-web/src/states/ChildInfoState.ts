import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "childState",
  storage: localStorage,
});

export interface childDataProps {
  idx: any;
  uuid: string;
  status: number;
  name: string;
  nickname: string;
  birthday: string;
  socialProvider: string;
  memberRole: string;
  email: string;
  regularAllowance: number;
  creditScore: number; // 추가: creditScore 속성
  quizRewardRemain: number; // 추가: quizRewardRemain 속성
  quizReward: number; // 추가: quizReward 속성
  smallAccount: null | any; // 추가: smallAccount 속성
  balanceAlarm: number;
  challengeAlarm: number;
  smallAccountAlarm: number;
}

export const childDataState = atom<childDataProps>({
  key: "childDataState",
  default: {
    idx: 0,
    uuid: "",
    status: 0,
    name: "",
    nickname: "",
    birthday: "",
    socialProvider: "",
    memberRole: "",
    email: "",
    regularAllowance: 0,
    creditScore: 0, // 추가: creditScore 속성
    quizRewardRemain: 0, // 추가: quizRewardRemain 속성
    quizReward: 0, // 추가: quizReward 속성
    smallAccount: null, // 추가: smallAccount 속성
    balanceAlarm: 0,
    challengeAlarm: 0,
    smallAccountAlarm: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
