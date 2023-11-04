import React, { useEffect } from "react";
import ChallengeAdd from "../Common/Challenge/ChallengeAdd";
import ChallengeCategory from "../Common/Challenge/ChallengeCategory";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import ChallengeTitle from "../Common/Challenge/ChallengeTitle";
import { MainContainer } from "../Common/Main/Main";

//axios
import api from "../../apis/Api";

/**
 * recoil
 */
import { useRecoilState } from "recoil";
import { ChallengeStore } from "../../states/ChallengeState";
import { isProposeChallenge } from "../../states/ChallengeState";
//카테고리 버튼 클릭
import { isButtonChallenge } from "../../states/ChallengeState";
//카테고리 조회
import {
  isCategoryChallenge,
  whichCategoryChallenge,
} from "../../states/ChallengeState";

//총 데이터
import { totalChallenge } from "../../states/ChallengeState";
import { getChildState } from "../Common/utils";

function Challenge() {
  const [ChallengeData, setChallengeData] = useRecoilState(ChallengeStore);
  const [isProposeState, setisProposeState] =
    useRecoilState(isProposeChallenge);
  const [isButtonState, setIsButtonState] = useRecoilState(isButtonChallenge);
  //카테고리 버튼
  const [isCategoryState] = useRecoilState(isCategoryChallenge);
  const [whichCategoryState] = useRecoilState(whichCategoryChallenge);

  let status_value: number;
  if (isCategoryState) {
    status_value = whichCategoryState;
  } else {
    status_value = 5;
  }

  const [totalChallengeData, setTotalChallengeData] =
    useRecoilState(totalChallenge);
  if (status_value === 5) {
    setTotalChallengeData(ChallengeData.length);
  }

  useEffect(() => {
    api
      .get(
        `/v1/challenges?status=${status_value}&extramemberUuid=${getChildState()}`
      )
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("GET 요청 성공:", response.data);
        setChallengeData(response.data);
        setisProposeState(false);
        setIsButtonState(false);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        if (error.response) {
          // 서버에서 응답이 왔지만, 응답 상태 코드가 실패인 경우
          console.error("GET 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          // 서버로 요청을 보내지 못한 경우
          console.error("GET 요청 실패 - 요청을 보낼 수 없음");
        } else {
          // 요청 준비 과정에서 에러가 발생한 경우
          console.error("GET 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  }, [isProposeState, isButtonState, whichCategoryState]);

  return (
    <MainContainer>
      <ChallengeTitle />
      <ChallengeCategory />
      {totalChallengeData === 4 ? <></> : <ChallengeAdd />}
      <ChallengeListContainer>
        <>
          {ChallengeData.length > 0 ? (
            <>
              {ChallengeData.map((challenge) => (
                <ChallengeList
                  data={challenge}
                  key={challenge.memberChallengeIdx}
                />
              ))}
            </>
          ) : (
            <>
              {status_value === 5 && <>챌린지내역이 없어요.</>}
              {status_value === 0 && <>진행중인 챌린지가 없어요.</>}
              {status_value === 2 && <>제안대기중인 챌린지가 없어요.</>}
            </>
          )}
        </>
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
