import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  width: 100vw;
  height: 80vh;
  background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ChildrenList = styled.div``;

function ParentsMain() {
  return <Container>ddd</Container>;
}

export default ParentsMain;
