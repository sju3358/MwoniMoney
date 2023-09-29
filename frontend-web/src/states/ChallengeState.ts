import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: "userUuidState",
//   storage: localStorage,
// });

interface newChallenge {
  childUuid: string;
  title: string;
  category: string;
  memo: string;
  reward: number;
  status: number;
  endTime: any;
}
export const newChallengeState = atom<newChallenge[]>({
  key: "new_challenge_state",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

export default {
  newChallengeState,
};
