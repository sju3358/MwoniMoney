import React from "react";
import styled from "styled-components";
import { WhiteBox } from "../Common/WhiteBox";
import Newspaper from "../../assests/image/main/Newspaper.png";

/**
 *
 * style
 */

const BalanceContainer = styled.div`
  // border: 1px solid black;
  padding: 7%;
  width: 100%;
  height: 100%;
`;

interface TextProps {
  fontsize: string;
  fontcolor: string; // 'String' -> 'string'
  fontpadding: string;
  fontweight: string;
  textalign: string;
}

const Text = styled.div<TextProps>`
  // border: 1px solid black;
  font-size: ${(props) => props.fontsize};
  color: ${(props) => props.fontcolor};
  padding: ${(props) => props.fontpadding};
  font-weight: ${(props) => props.fontweight};
  text-align: ${(props) => props.textalign};
`;

/**
 *
 * 이미지
 */
interface ImgProps {
  width: string;
  height: string;
}
const Img = styled.img<ImgProps>`
  // border: 1px solid black;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 1%;
`;
const ImgBox = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
`;

const ButtonBox = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
`;
interface ButtonProps {
  backgroundcolor: string;
  border: string;
}
const Button = styled.button<ButtonProps>`
  // border: 1px solid black;
  background-color: ${(props) => props.backgroundcolor};
  border: ${(props) => props.border};
  border-radius: 5px;
  margin: 2% 5% 0% 5%;
  padding: 2% 7% 2% 7%;
`;

const ClickButton = styled.button`
  background-color: #ffa27e;
  border: 0;
  border-radius: 12px;
  position: relative;
  bottom: 10%;
  left: 50%;
`;

function Balance() {
  const balancequestion = "ABC 기업의 주식을 구매하시겠습니까?";
  return (
    <BalanceContainer>
      <Text
        fontsize="1.25rem"
        fontcolor="black"
        fontpadding="0% 0% 10% 0%"
        fontweight="700"
        textalign=""
      >
        오늘의 밸런스 게임
      </Text>
      <WhiteBox style={{ width: "100%", height: "70%" }}>
        <ImgBox>
          <Img src={`${Newspaper}`} width="25%" height="25%" />
        </ImgBox>
        <ClickButton>Click</ClickButton>

        <Text
          fontsize="0.75rem"
          fontcolor="black"
          fontpadding="3%"
          fontweight="700"
          textalign="center"
        >
          {balancequestion}
        </Text>
        <ButtonBox>
          <Button backgroundcolor="#FBD56E" border="0">
            산다
          </Button>
          <Button backgroundcolor="F4F4F4" border="0">
            안산다
          </Button>
        </ButtonBox>
      </WhiteBox>
    </BalanceContainer>
  );
}

export default Balance;
