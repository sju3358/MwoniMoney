import React from "react";
import styled from "styled-components";
import AddBox from "../../../assests/image/AddBox.png";

const AddContainer = styled.button`
  // border: 1px solid black;
  width: 100%;
  height: 12%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Add = styled.div`
  border: 1px solid red;
  width: 90%;
  height: 80%;
  background-image: url(${AddBox});
  background-size: 100% 100%;
`;

function ChallengeAdd() {
  return (
    <AddContainer>
      <Add />
    </AddContainer>
  );
}

export default ChallengeAdd;
