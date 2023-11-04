import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "./AboutText";

//recoil
import { useRecoilState } from "recoil";
import { isCategoryLoan, whichCategoryLoan } from "../../../states/LoanState";

const CategoryContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 5%;
`;

interface CategoryProps {
  backcolor: string;
  width?: string;
  height?: string;
  marginR?: string;
  marginL?: string;
  justify?: string;
}

export const Category = styled.div<CategoryProps>`
  width: ${(props) => (props.width ? props.width : "20%")};
  height: ${(props) => (props.height ? props.height : "60%")};
  // border: 1px solid red;
  border-top-left-radius: 20% 40%;
  border-top-right-radius: 20% 40%;
  border-bottom-left-radius: 20% 40%;
  border-bottom-right-radius: 20% 40%;
  background-color: ${(props) => props.backcolor};
  margin-right: ${(props) => (props.marginR ? props.marginR : "5%")};
  margin-left: ${(props) => (props.marginL ? props.marginL : "5%")};
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: center;
  font-weight: bold;
`;

interface CategoryTagProps {
  backcolor: string;
  width: string;
  isActive: boolean;
}
export const CategoryTag = styled.div<CategoryTagProps>`
  // 그림자
  // box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  border: ${(props) => (props.isActive ? "none" : "1px solid #BBBBBB")};
  width: ${(props) => props.width};
  height: 60%;
  // border-top-left-radius: 20% 40%;
  // border-top-right-radius: 20% 40%;
  // border-bottom-left-radius: 20% 40%;
  // border-bottom-right-radius: 20% 40%;
  border-radius: 50px;
  background-color: ${(props) => (props.isActive ? props.backcolor : "white")};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

interface CategoryTagsProps {
  content1: string;
  content2: string;
  content3: string;
}

function CategoryTags(props: CategoryTagsProps) {
  const { content1, content2, content3 } = props;

  //버튼 동작
  const [isCategoryState, setisCategoryState] = useRecoilState(isCategoryLoan);
  const [whichCategoryState, setwhichCategoryState] =
    useRecoilState(whichCategoryLoan);
  //선택된 버튼 비활
  const [activeTag, setActiveTag] = useState("GENERAL");

  const handleSearch = (searchString: string) => {
    setisCategoryState(true);
    setActiveTag(searchString);

    let status;
    switch (searchString) {
      case "GENERAL":
        setwhichCategoryState("GENERAL");
        console.log("GENERAL 클릭됨");
        break;
      case "APPROVAL":
        setwhichCategoryState("APPROVAL");
        console.log("대출중  클릭됨");
        break;
      case "WATING":
        setwhichCategoryState("WATING");
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
        isActive={activeTag === "GENERAL"}
        onClick={() => handleSearch("GENERAL")}
      >
        <Text marginL="0%" fontsize="0.85rem">
          {content1}
        </Text>
      </CategoryTag>
      <CategoryTag
        width="20%"
        isActive={activeTag === "APPROVAL"}
        onClick={() => handleSearch("APPROVAL")}
        backcolor="#fcdf92"
      >
        <Text marginL="0%" fontsize="0.85rem">
          {content2}
        </Text>
      </CategoryTag>
      <CategoryTag
        width="20%"
        isActive={activeTag === "WATING"}
        onClick={() => handleSearch("WATING")}
        backcolor="#d1d1d1"
      >
        <Text marginL="0%" fontsize="0.85rem">
          {content3}
        </Text>
      </CategoryTag>
    </CategoryContainer>
  );
}

export default CategoryTags;
