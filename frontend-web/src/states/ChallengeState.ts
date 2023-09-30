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
  endTime: string;
}

//input에서 넣은 post용 데이터
export const newChallenge = atom<newChallenge>({
  key: "new_challenge",
  default: {
    childUuid: "",
    title: "",
    category: "",
    memo: "",
    reward: 0,
    status: 0,
    endTime: "",
  },
  // effects_UNSTABLE: [persistAtom],
});

export interface getChallenge {
  memberChallengeIdx: number;
  challengeIdx: number;
  memberIdx: number;
  memo: string;
  reward: number;
  status: number;
  endTime: any;
  createdTime: any;
}

export const ChallengeStore = atom<getChallenge[]>({
  key: "challenge_store",
  default: [],
});

export const isProposeChallenge = atom<boolean>({
  key: "is_propose_challenge",
  default: false,
});
