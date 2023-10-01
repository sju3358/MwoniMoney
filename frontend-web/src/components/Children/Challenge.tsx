import React, { useEffect } from "react";
import ChallengeAdd from "../Common/Challenge/ChallengeAdd";
import ChallengeCategory from "../Common/Challenge/ChallengeCategory";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import ChallengeTitle from "../Common/Challenge/ChallengeTitle";
import { MainContainer } from "../Common/Main/Main";
import { Text } from "../Common/About/AboutText";

//axios
import { api } from "../../apis/Api";

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

interface ChallengeProps {
  ismain: string;
}

function Challenge(props: ChallengeProps) {
  const [ChallengeData, setChallengeData] = useRecoilState(ChallengeStore);
  const [isProposeState, setisProposeState] =
    useRecoilState(isProposeChallenge);
  const [isButtonState, setIsButtonState] = useRecoilState(isButtonChallenge);

  const extramemberUuid_value = "none";
  //카테고리 버튼
  const [isCategoryState, setisCategoryState] =
    useRecoilState(isCategoryChallenge);
  const [whichCategoryState, setwhichCategoryState] = useRecoilState(
    whichCategoryChallenge
  );

  let status_value: number;
  if (isCategoryState) {
    status_value = whichCategoryState;
  } else {
    status_value = 5;
  }

  useEffect(() => {
    api
      .get(
        `/v1/challenges?status=${status_value}&extramemberUuid=${extramemberUuid_value}`
      )
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("GET 요청 성공:", response.data);
        setChallengeData(response.data);
        /**
         *
         */
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
      {props.ismain === "Y" ? (
        <>
          {ChallengeData.length > 0 ? (
            <Text>현재 진행중인 챌린지에요!</Text>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <ChallengeTitle />
          <ChallengeCategory />
          <ChallengeAdd />
        </>
      )}
      <ChallengeListContainer>
        {props.ismain === "Y" ? (
          <>
            {ChallengeData.length > 0 ? (
              <>
                {ChallengeData.slice(0, 3).map((challenge) => (
                  <ChallengeList
                    data={challenge}
                    key={challenge.memberChallengeIdx}
                  />
                ))}
                {ChallengeData.length > 3 && (
                  <Text>그 외의 챌린지도 더 있어요!</Text>
                )}
              </>
            ) : (
              <Text>현재 진행중인 챌린지가 없어요. 챌린지를 제안해주세요!</Text>
            )}
          </>
        ) : (
          //메인 아닐 때
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
              <>챌린지를 제안해주세요!!</>
            )}
          </>
        )}
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
