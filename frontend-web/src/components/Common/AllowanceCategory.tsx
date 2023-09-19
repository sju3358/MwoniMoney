import React from "react";
import styled from "styled-components";

{
  /*category 상자 */
}
const CategoryContainer = styled.div`
  // border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Category = styled.div`
  background-color: #f4f4f4;
  width: 30%;
  height: 80%;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 1em; /* 글자 크기 조절 */
  font-weight: bold;
`;

function AllowanceCategory() {
  return (
    <CategoryContainer>
      <Category>1만원</Category>
      <Category>5만원</Category>
      <Category>10만원</Category>
    </CategoryContainer>
  );
}

export default AllowanceCategory;
