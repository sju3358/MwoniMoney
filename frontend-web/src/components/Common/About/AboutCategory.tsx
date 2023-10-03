import React, { useState } from "react";
import styled from "styled-components";

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
  border-top-left-radius: 20% 40%;
  border-top-right-radius: 20% 40%;
  border-bottom-left-radius: 20% 40%;
  border-bottom-right-radius: 20% 40%;
  background-color: ${(props) => (props.isActive ? props.backcolor : "white")};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

interface CategoryTagProps {
  content1: string;
  content2: string;
  content3: string;
}

function CategoryTag(props: CategoryTagProps) {
  const { content1, content2, content3 } = props;

  //버튼 동작
  const [isCategoryState, setisCategoryState] = useRecoilState(isCategoryLoan);
  const [whichCategoryState, setwhichCategoryState] =
    useRecoilState(whichCategoryLoan);
  //선택된 버튼 비활
  const [activeButton, setActiveButton] = useState("all");

  const handleSearch = (searchString: string) => {
    setisCategoryState(true);
    setActiveButton(searchString);

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
      <CategoryBtn
        backcolor="#ffffff"
        width="20%"
        isActive={activeButton === "GENERAL"}
        onClick={() => handleSearch("GENERAL")}
      >
        {content1}
      </CategoryBtn>
      <CategoryBtn
        width="20%"
        isActive={activeButton === "APPROVAL"}
        onClick={() => handleSearch("APPROVAL")}
        backcolor="#fcdf92"
      >
        {content2}
      </CategoryBtn>
      <CategoryBtn
        width="20%"
        isActive={activeButton === "WATING"}
        onClick={() => handleSearch("WATING")}
        backcolor="#d1d1d1"
      >
        {content3}
      </CategoryBtn>
    </CategoryContainer>
  );
}

export default CategoryTag;
