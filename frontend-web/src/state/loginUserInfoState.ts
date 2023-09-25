import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "loginUserState",
  storage: localStorage,
});

export const memberTypeState = atom({
  key: "member_type",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const memberNicknameState = atom({
  key: "member_nickname",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const memberIntroState = atom({
  key: "member_intro",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const memberEmailState = atom({
  key: "member_email",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const memberActiveSymbolState = atom({
  key: "member_active_symbols",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const memberLevelState = atom({
  key: "member_level",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export default {
  memberTypeState,
  memberNicknameState,
  memberIntroState,
  memberEmailState,
  memberLevelState,
};
