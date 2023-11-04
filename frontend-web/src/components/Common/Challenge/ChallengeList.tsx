import React from "react";
import styled from "styled-components";
import { Category } from "./ChallengeCategory";
import { Text } from "../About/AboutText";
//recoil
import { useRecoilState } from "recoil";
import { getChallenge } from "../../../states/ChallengeState";
import { userDataState } from "../../../states/UserInfoState";
import { isButtonChallenge } from "../../../states/ChallengeState";
//axios
import api from "../../../apis/Api";
//router
import { useNavigate } from "react-router-dom";
//util
import { dateFormat } from "../utils";
import { moneyFormat } from "../utils";

export const ChallengeListContainer = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 90%;
  overflow-y: auto; /* 세로 스크롤만 생성 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

interface ListProps {
  ismain?: string | null;
}

export const ListComponent = styled.div<ListProps>`
  // border: 1px solid blue;
  background-color: #ffffff;
  width: 90%;
  height: ${(props) => (props.ismain === "Y" ? "25%" : "25%")};
  border-radius: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListTitle = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  white-space: nowrap;
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
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DeadLine = styled.div`
  // border: 1px solid red;
  width: 35%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 5%;
`;

export const ListBtn = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface BtnProps {
  backcolor: string;
  afbackcolor: string;
  border?: string;
}

const ChallengeBtn = styled.div<BtnProps>`
  width: 35%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  border: ${(props) => (props.border ? props.border : "none")};
  background-color: ${(props) => props.backcolor};
  &:active {
    background-color: ${(props) => props.afbackcolor};
    transform: translate(0em, 0.2em);
  }
}
`;
interface Props {
  data: getChallenge;
  ismain?: string | null;
}
const ListContainer = styled.div`
  // border: 1px solid orange;
  display: flex;
  width: 90%;
  height: 95%;
  flex-direction: column;
`;

function ChallengeList({ data, ismain }: Props) {
  const navigate = useNavigate();
  const [userData] = useRecoilState(userDataState);
  const role = userData.memberRole;

  //자식의 memberChallengeidx
  const memberChallengeIdx = data.memberChallengeIdx;

  //챌린지 리스트의 버튼이 클릭되어있는지
  const [isButtonState, setIsButtonState] = useRecoilState(isButtonChallenge);

  let ChildUuid: string | null = null;
  const childStateString: string | null = localStorage.getItem("childState");

  if (childStateString !== null) {
    const childState = JSON.parse(childStateString);
    ChildUuid = childState.childDataState.uuid;
    console.log(ChildUuid);
  } else {
    console.error("로컬 스토리지에서 'childState' 값을 찾을 수 없습니다.");
  }

  const patchData = { toUUID: ChildUuid };
  const handleAccept = () => {
    api
      .patch(`/v1/challenges/${memberChallengeIdx}/accept`)
      .then((response) => {
        console.log("부모 챌린지 수락");
        setIsButtonState(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "로그인 되어있지 않습니다.") {
          navigate("/LoginPage");
        }
      });
  };
  const handleReject = () => {
    api
      .patch(`/v1/challenges/${memberChallengeIdx}/reject`)
      .then((response) => {
        console.log("부모 챌린지 거절");
        setIsButtonState(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "로그인 되어있지 않습니다.") {
          navigate("/LoginPage");
        }
      });
  };
  const handleComplete = () => {
    if (role === "PARENT") {
      //부모 완료 api
      api
        .patch(`/v1/challenges/${memberChallengeIdx}`, patchData)
        .then((response) => {
          console.log("부모 챌린지 완료 요청 완료 처리");
          setIsButtonState(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data === "로그인 되어있지 않습니다.") {
            navigate("/LoginPage");
          }
        });
    } else {
      //자식 완료 요청 api
      api
        .patch(`/v1/challenges/propose/${memberChallengeIdx}`)
        .then((response) => {
          console.log("자식 : 챌린지 완료 요청 완료 처리");
          setIsButtonState(true);
        })
        .catch((error) => {
          if (error.response.data === "로그인 되어있지 않습니다.") {
            navigate("/LoginPage");
          } else if (error.response.data === "챌린지 기록이 없습니다.") {
            alert("이미 지워진 챌린지입니다.");
            window.location.reload();
          } else {
            console.log(error);
          }
        });
    }
  };
  const handleDelete = () => {
    api
      .delete(`/v1/challenges/${memberChallengeIdx}`)
      .then((response) => {
        console.log("챌린지 삭제");
        setIsButtonState(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "로그인 되어있지 않습니다.") {
          navigate("/LoginPage");
        }
      });
  };

  return (
    <ListComponent ismain={ismain}>
      <ListContainer>
        <ListTitle style={{ justifyContent: "space-between" }}>
          <Text fontsize="1.5rem" marginL="0%" fontweight="bold">
            {data.memo}
          </Text>
          {/* <Title>{data.memo}</Title> */}
          <CategoryTag style={{ height: "60%" }}>
            {data.status === 0 && (
              <Category backcolor="#fcdf92" width="80%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  진행중
                </Text>
              </Category>
            )}
            {data.status === 1 && (
              <Category backcolor="#d1d1d1" width="80%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  완료대기
                </Text>
              </Category>
            )}
            {data.status === 2 && (
              <Category backcolor="#d1d1d1" width="80%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  제안대기
                </Text>
              </Category>
            )}
            {data.status === 3 && (
              <Category backcolor="#B9DEB3" width="80%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  완료
                </Text>
              </Category>
            )}
            {data.status === 4 && (
              <Category backcolor="#FFA27E" width="80%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  거절
                </Text>
              </Category>
            )}
            {data.status === 5 && (
              <Category backcolor="#656565" width="80%">
                <Text
                  color="white"
                  fontsize="0.9rem"
                  marginL="0%"
                  fontweight="700"
                >
                  만료
                </Text>
              </Category>
            )}
          </CategoryTag>
          <Text fontweight="700" fontsize="1rem" marginL="0%">
            ~ {dateFormat(data.endTime)}
          </Text>
        </ListTitle>
        <Text
          style={{ height: "20%" }}
          fontweight="700"
          fontsize="1rem"
          marginL="0%"
        >
          보상 : {moneyFormat(data.reward)}원
        </Text>
        <div style={{ height: "20%" }}>
          {role === "PARENT" ? (
            <>
              {(data.status === 0 ||
                data.status === 3 ||
                data.status === 4 ||
                data.status === 5) && (
                <ListBtn style={{ justifyContent: "flex-end" }}>
                  <ChallengeBtn
                    afbackcolor="#BBBBBB"
                    backcolor="white"
                    border="1px solid #BBBBBB"
                    onClick={handleDelete}
                  >
                    삭제
                  </ChallengeBtn>
                </ListBtn>
              )}
              {data.status === 1 && (
                <ListBtn style={{ justifyContent: "flex-end" }}>
                  <ChallengeBtn
                    afbackcolor="#FFC107"
                    backcolor="#fbd56e"
                    onClick={handleComplete}
                  >
                    완료
                  </ChallengeBtn>
                </ListBtn>
              )}
              {data.status === 2 && (
                <ListBtn>
                  <ChallengeBtn
                    afbackcolor="#FFC107"
                    backcolor="#fbd56e"
                    onClick={handleAccept}
                  >
                    수락
                  </ChallengeBtn>
                  <ChallengeBtn
                    afbackcolor="#BBBBBB"
                    backcolor="white"
                    border="1px solid #BBBBBB"
                    onClick={handleReject}
                  >
                    거절
                  </ChallengeBtn>
                </ListBtn>
              )}
            </>
          ) : (
            //CHILD
            <ListBtn style={{ justifyContent: "flex-end" }}>
              {data.status === 0 && (
                <ChallengeBtn
                  afbackcolor="#FFC107"
                  backcolor="#fbd56e"
                  onClick={handleComplete}
                >
                  완료
                </ChallengeBtn>
              )}
            </ListBtn>
          )}
        </div>
      </ListContainer>
    </ListComponent>
  );
}

export default ChallengeList;
