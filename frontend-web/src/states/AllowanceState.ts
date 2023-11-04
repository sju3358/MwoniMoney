import { atom } from "recoil";

//정기용돈
export const allowanceMoney = atom<number>({
  key: "allowance_money",
  default: 0,
});

export const isAllowanceMoney = atom<boolean>({
  key: "is_allowance_money",
  default: false,
});

//특별용돈
export const specialMoney = atom<number>({
  key: "special_money",
  default: 0,
});

export const isSpecialMoney = atom<boolean>({
  key: "is_special_money",
  default: false,
});
