import React from "react";
import styled from "styled-components";
import { Category } from "./ChallengeCategory";

//recoil
import { getChallenge } from "../../../states/ChallengeState";

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
  return (
    <ListComponent>
      <ListTitle>
        <Title>{data.memo}</Title>
        <CategoryTag>
          <Category backcolor="#fcdf92" width="80%">
            진행중
            {data.status}
          </Category>
        </CategoryTag>
        <DeadLine> {formattedDate}</DeadLine>
      </ListTitle>
      <ListBtn>
        <ChallengeBtn backcolor="#fbd56e">완료</ChallengeBtn>
        <ChallengeBtn backcolor="#f4f4f4">삭제</ChallengeBtn>
      </ListBtn>
    </ListComponent>
  );
}

export default ChallengeList;
