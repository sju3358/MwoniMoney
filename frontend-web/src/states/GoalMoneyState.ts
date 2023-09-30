import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface GoalMoneyProps {
  goalName: string;
  goalMoney: number;
  saveRatio: number;
  image: any;
}

export const GoalMoneyState = atom<GoalMoneyProps>({
  key: "GoalMoneyState",
  default: {
    goalName: "",
    goalMoney: 0,
    saveRatio: 0,
    image: new File([], "dummy.jpg"),
  },
});
