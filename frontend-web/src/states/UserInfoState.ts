import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userUuidState",
  storage: localStorage,
});

export const memberUuidState = atom({
  key: "member_uuid",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export default {
  memberUuidState,
};
