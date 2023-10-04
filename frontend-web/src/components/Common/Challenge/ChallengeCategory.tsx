import React, { useState } from "react";
import styled from "styled-components";

//recoil
import { useRecoilState } from "recoil";
import {
  isCategoryChallenge,
  whichCategoryChallenge,
} from "../../../states/ChallengeState";

const CategoryContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 5%;
`;

interface CategoryProps {
  backcolor: string;
  width: string;
}

export const Category = styled.div<CategoryProps>`
  // 그림자
  // box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  width: ${(props) => props.width};
  height: 60%;
  border-top-left-radius: 20% 40%;
  border-top-right-radius: 20% 40%;
  border-bottom-left-radius: 20% 40%;
  border-bottom-right-radius: 20% 40%;
  background-color: ${(props) => props.backcolor};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

interface CategoryBtnProps {
  backcolor: string;
  width: string;
  isActive: boolean;
}
export const CategoryBtn = styled.button<CategoryBtnProps>`
  // 그림자
  // box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  border: ${(props) => (props.isActive ? "none" : "1px solid #BBBBBB")};
  width: ${(props) => props.width};
  height: 60%;
  border-radius: 50px;
  // border-top-left-radius: 20% 40%;
  // border-top-right-radius: 20% 40%;
  // border-bottom-left-radius: 20% 40%;
  // border-bottom-right-radius: 20% 40%;
  background-color: ${(props) => (props.isActive ? props.backcolor : "white")};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

function ChallengeCategory() {
  const [isCategoryState, setisCategoryState] =
    useRecoilState(isCategoryChallenge);
  const [whichCategoryState, setwhichCategoryState] = useRecoilState(
    whichCategoryChallenge
  );
  //선택된 버튼 비활
  const [activeButton, setActiveButton] = useState("all");

  const handleSearch = (searchString: string) => {
    setisCategoryState(true);
    setActiveButton(searchString);

    let status;
    switch (searchString) {
      case "all":
        setwhichCategoryState(5);
        console.log("All 클릭됨");
        break;
      case "ing":
        setwhichCategoryState(0);
        console.log("미완료  클릭됨");
        break;
      case "propose":
        setwhichCategoryState(2);
        console.log("제안 대기 클릭됨");
        break;
      default:
        status = -1;
        console.log("기본 동작");
    }
  };
  return (
    <CategoryContainer>
      <CategoryBtn
        backcolor="#ffffff"
        width="20%"
        isActive={activeButton === "all"}
        onClick={() => handleSearch("all")}
      >
        모두
      </CategoryBtn>
      <CategoryBtn
        backcolor="#fcdf92"
        width="20%"
        isActive={activeButton === "ing"}
        onClick={() => handleSearch("ing")}
      >
        진행중
      </CategoryBtn>
      <CategoryBtn
        backcolor="#d1d1d1"
        width="20%"
        isActive={activeButton === "propose"}
        onClick={() => handleSearch("propose")}
      >
        제안대기
      </CategoryBtn>
    </CategoryContainer>
  );
}

export default ChallengeCategory;
