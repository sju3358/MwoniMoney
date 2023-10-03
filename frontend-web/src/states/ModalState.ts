import { atom } from "recoil";

export const ModalState = atom<boolean>({
  key: "ModalState",
  default: false,
});
