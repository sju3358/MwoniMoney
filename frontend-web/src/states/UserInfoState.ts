import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: localStorage,
});

export const userDataState = atom({
  key: "userDataState",
  default: {
    idx: 0,
    uuid: "",
    status: 0,
    name: "",
    nickname: "",
    birthday: "",
    socialProvider: "",
    socialId: "",
    memberRole: "",
  },
  effects_UNSTABLE: [persistAtom],
});
