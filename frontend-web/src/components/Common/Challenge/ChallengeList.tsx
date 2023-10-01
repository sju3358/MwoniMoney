import React from "react";
import styled from "styled-components";
import { Category } from "./ChallengeCategory";

//recoil
import { getChallenge } from "../../../states/ChallengeState";
import { userDataState } from "../../../states/UserInfoState";
import { useRecoilState } from "recoil";

//axios
import { api } from "../../../apis/Api";

export const ChallengeListContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 55%;
  overflow-y: auto; /* 세로 스크롤만 생성 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

export const ListComponent = styled.div`
  // border: 1px solid red;
  background-color: #ffffff;
  width: 90%;
  height: 30%;
  border-top-left-radius: 4% 4%;
  border-top-right-radius: 4% 4%;
  border-bottom-left-radius: 4% 4%;
  border-bottom-right-radius: 4% 4%;
  margin-bottom: 5%;
`;

export const ListTitle = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  margin-left: 3%;
`;

export const Title = styled.div`
  // border: 1px solid black;
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 1.5em;
`;
export const CategoryTag = styled.div`
  // border: 1px solid black;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DeadLine = styled.div`
  // border: 1px solid black;
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 10%;
`;

export const ListBtn = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface BtnProps {
  backcolor: string;
}

const ChallengeBtn = styled.div<BtnProps>`
  width: 35%;
  height: 70%;
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  background-color: ${(props) => props.backcolor};
`;
interface Props {
  data: getChallenge;
}

function ChallengeList({ data }: Props) {
  const formatDate = (origindate: string) => {
    const date = new Date(origindate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedDate = formatDate(data.endTime);

  const [userData, setUserData] = useRecoilState(userDataState);
  const role = userData.memberRole;

  //자식의 memberChallengeidx
  const memberChallengeIdx = data.memberChallengeIdx;

  const handleAccept = () => {
    api
      .patch(`/challenges/${memberChallengeIdx}/accept`)
      .then((response) => {
        console.log("부모 챌린지 수락");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReject = () => {
    api
      .patch(`/challenges/${memberChallengeIdx}/reject`)
      .then((response) => {
        console.log("부모 챌린지 거절");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleComplete = () => {
    if (role === "PARENT") {
      //부모 완료 api
      api
        .patch(`/challenges/${memberChallengeIdx}`)
        .then((response) => {
          console.log("부모 챌린지 완료 요청 완료 처리");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //자식 완료 요청 api
      api
        .patch(`/challenges/propose/${memberChallengeIdx}`)
        .then((response) => {
          console.log("자식 : 챌린지 완료 요청 완료 처리");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleDelete = () => {
    api
      .delete(`/challenges/${memberChallengeIdx}`)
      .then((response) => {
        console.log("챌린지 삭제");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ListComponent>
      <ListTitle>
        <Title>{data.memo}</Title>
        <CategoryTag>
          {data.status === 0 && (
            <Category backcolor="#fcdf92" width="80%">
              진행중
            </Category>
          )}
          {data.status === 1 && (
            <Category backcolor="#d1d1d1" width="80%">
              완료대기
            </Category>
          )}
          {data.status === 2 && (
            <Category backcolor="#d1d1d1" width="80%">
              제안대기
            </Category>
          )}
          {data.status === 3 && (
            <Category backcolor="#B9DEB3" width="80%">
              완료
            </Category>
          )}
          {data.status === 5 && (
            <Category backcolor="#FFA27E" width="80%">
              거절
            </Category>
          )}
        </CategoryTag>
        <DeadLine> {formattedDate}</DeadLine>
      </ListTitle>
      <ListBtn>
        {/* {role === "CHILD" ? ( */}
        {role === "PARENT" ? (
          //PARENT
          <>
            {(data.status === 0 ||
              data.status === 3 ||
              data.status === 4 ||
              data.status === 5) && (
              <>
                <ChallengeBtn backcolor="#f4f4f4" onClick={handleDelete}>
                  삭제
                </ChallengeBtn>
              </>
            )}
            {data.status === 1 && (
              <>
                <ChallengeBtn backcolor="#fbd56e" onClick={handleComplete}>
                  완료
                </ChallengeBtn>
              </>
            )}
            {data.status === 2 && (
              <>
                <ChallengeBtn backcolor="#fbd56e" onClick={handleAccept}>
                  수락
                </ChallengeBtn>
                <ChallengeBtn backcolor="#f4f4f4" onClick={handleReject}>
                  거절
                </ChallengeBtn>
              </>
            )}
          </>
        ) : (
          //CHILD
          <>
            {data.status === 0 && (
              <ChallengeBtn backcolor="#fbd56e" onClick={handleComplete}>
                완료
              </ChallengeBtn>
            )}
          </>
        )}
      </ListBtn>
    </ListComponent>
  );
}

export default ChallengeList;
