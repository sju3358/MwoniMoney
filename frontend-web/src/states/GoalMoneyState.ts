import { atom } from "recoil";

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
  goalState: boolean;
}

export const GoalCheckState = atom<GoalCheckProps>({
  key: "GoalCheckState",
  default: {
    goalState: false,
  },
});

interface GoalImgCheckProps {
  ImgCheck: boolean;
}

export const GoalImgCheckState = atom<GoalImgCheckProps>({
  key: "GoalImgCheckState",
  default: {
    ImgCheck: false,
  },
});
