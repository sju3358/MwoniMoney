import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../About/AboutText";

//recoil
import { useSetRecoilState } from "recoil";
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
export const CategoryTag = styled.button<CategoryBtnProps>`
  border: ${(props) => (props.isActive ? "none" : "1px solid #BBBBBB")};
  width: ${(props) => props.width};
  height: 60%;
  border-radius: 50px;
  background-color: ${(props) => (props.isActive ? props.backcolor : "white")};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

function ChallengeCategory() {
  const setisCategoryState = useSetRecoilState(isCategoryChallenge);
  const setwhichCategoryState = useSetRecoilState(whichCategoryChallenge);
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
      <CategoryTag
        backcolor="#ffffff"
        width="20%"
        isActive={activeButton === "all"}
        onClick={() => handleSearch("all")}
      >
        <Text marginL="0%" fontsize="0.85rem">
          모두
        </Text>
      </CategoryTag>
      <CategoryTag
        backcolor="#fcdf92"
        width="20%"
        isActive={activeButton === "ing"}
        onClick={() => handleSearch("ing")}
      >
        <Text marginL="0%" fontsize="0.85rem">
          진행중
        </Text>
      </CategoryTag>
      <CategoryTag
        backcolor="#d1d1d1"
        width="20%"
        isActive={activeButton === "propose"}
        onClick={() => handleSearch("propose")}
      >
        <Text marginL="0%" fontsize="0.85rem">
          제안대기
        </Text>
      </CategoryTag>
    </CategoryContainer>
  );
}

export default ChallengeCategory;
