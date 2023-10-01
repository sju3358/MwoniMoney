import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface GoalMoneyProps {
  goalName: string;
  goalMoney: number;
  saveRatio: number;
  goalBalance: number;
  image: any;
  goalStartDate: string;
}

export const GoalMoneyState = atom<GoalMoneyProps>({
  key: "GoalMoneyState",
  default: {
    goalName: "", // 등록 물품 이름
    goalMoney: 0, // 등록 물품 가격
    saveRatio: 0, // 정기용돈의 몇% 저축할지
    goalBalance: 0,
    goalStartDate: "0000-00-00",
    image: new File([], "dummy.jpg"),
  },
});

interface GoalCheckProps {
  goalName: boolean;
  goalMoney: boolean;
  saveRatio: boolean;
  goalBalance: boolean;
  image: boolean;
  goalStartDate: boolean;
}

export const GoalCheckState = atom<GoalCheckProps>({
  key: "GoalCheckState",
  default: {
    goalName: false, // 등록 물품 이름
    goalMoney: false, // 등록 물품 가격
    saveRatio: false, // 정기용돈의 몇% 저축할지
    goalBalance: false,
    goalStartDate: false,
    image: false,
  },
});
