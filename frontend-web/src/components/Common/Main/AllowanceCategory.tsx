import React from "react";
import styled from "styled-components";

/*category 상자 */

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
  background-color: white;
  border: 1px solid #bbbbbb;
  border-radius: 12px;
  width: 28%;
  height: 80%;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 1em; /* 글자 크기 조절 */
  font-weight: bold;
  &:active {
    background-color: #bbbbbb;
    transform: translate(0em, 0.2em);
  }
`;

function AllowanceCategory() {
  const handleChangeMoney = () => {};
  return (
    <CategoryContainer>
      <Category onClick={handleChangeMoney}>1만원</Category>
      <Category>5만원</Category>
      <Category>10만원</Category>
    </CategoryContainer>
  );
}

export default AllowanceCategory;
