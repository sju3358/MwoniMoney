import React from "react";
import styled from "styled-components";

/*글 상자 */

const TextContainer = styled.div`
  // border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  padding-left: 5%;
  display: flex; /* 수직축 가운데 정렬을 위해 추가 */
  flex-direction: column;
  align-items: center; /* 수직축 가운데 정렬을 위해 추가 */
`;

const TextBox1 = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 65%;
  font-size: 1.7em;
  font-weight: bold;
  display: flex; /* 내부 텍스트를 수직축 가운데 정렬을 위해 추가 */
  align-items: center; /* 내부 텍스트를 수직축 가운데 정렬을 위해 추가 */
`;

const TextBox2 = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 35%;
  font-size: 1em;
`;

interface TextProps {
  text1: string;
  text2: string;
}

function AllowanceText({ text1, text2 }: TextProps) {
  // Props로 text1과 text2를 받아옵니다.
  return (
    <TextContainer>
      <TextBox1>{text1}</TextBox1>
      <TextBox2>{text2}</TextBox2>
    </TextContainer>
  );
}

export default AllowanceText;
