import React from "react";
import styled from "styled-components";

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
  backColor: string;
  width: string;
}

export const Category = styled.div<CategoryProps>`
  width: ${(props) => props.width};
  height: 60%;
  border-top-left-radius: 20% 40%;
  border-top-right-radius: 20% 40%;
  border-bottom-left-radius: 20% 40%;
  border-bottom-right-radius: 20% 40%;
  background-color: ${(props) => props.backColor};
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

function ChallengeCategory() {
  return (
    <CategoryContainer>
      <Category backColor="#ffffff" width="20%">
        모두
      </Category>
      <Category backColor="#fcdf92" width="20%">
        진행중
      </Category>
      <Category backColor="#d1d1d1" width="20%">
        제안대기
      </Category>
    </CategoryContainer>
  );
}

export default ChallengeCategory;
