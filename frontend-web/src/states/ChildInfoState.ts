import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "childState",
  storage: localStorage,
});

export interface userDataProps {
  idx: any;
  uuid: string;
  status: number;
  name: string;
  nickname: string;
  birthday: string;
  socialProvider: string;
  socialId: string;
  memberRole: string;
  email: string;
}

export const userDataState = atom<userDataProps>({
  key: "childDataState",
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
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export interface userCheckProps {
  nameCheck: boolean;
  birthdayCheck: boolean;
  emailCheck: boolean;
}

export const userCheckState = atom<userCheckProps>({
  key: "useCheckState",
  default: {
    nameCheck: false,
    birthdayCheck: false,
    emailCheck: false,
  },
});
