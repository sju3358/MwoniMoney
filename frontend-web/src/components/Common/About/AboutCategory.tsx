import React from "react";
import styled from "styled-components";

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
  content1: string;
  content2: string;
  content3: string;
}

function CategoryTag(props: CategoryTagProps) {
  const { content1, content2, content3 } = props;
  return (
    <CategoryContainer>
      <Category backcolor="#ffffff">{content1}</Category>
      <Category backcolor="#fcdf92">{content2}</Category>
      <Category backcolor="#d1d1d1">{content3}</Category>
    </CategoryContainer>
  );
}

export default CategoryTag;
