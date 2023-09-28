import React from "react";
import styled from "styled-components";
import Newspaper from "../../../assests/image/main/Newspaper.png";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import News from "../../../modal/Quiz/News";
import { TextBox } from "../About/AboutText";
import { Container } from "../About/AboutContainer";
import { EmogiBox } from "../About/AboutEmogi";

/**
 *
 * style
 */

interface TextProps {
  fontsize?: string | null;
  fontcolor?: string | null; // 'String' -> 'string'
  fontpadding?: string | null;
  fontweight?: string | null;
  textalign?: string | null;
}

/**
 *
 * 이미지
 */
interface ImgProps {
  width?: string | null;
  height?: string | null;
  padding?: string | null;
  margin?: string | null;
}

export const Img_no = styled.img<ImgProps>`
  // border: 1px solid black;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
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
  font-weight: bold;
  font-size: 1em;
`;

const Click = styled.div`
  width: 20%;
  height: 17%;
  background-color: #ffa27e;
  border: 0;
  border-radius: 50px;
  position: relative;
  bottom: 15%;
  left: 20%;
  display: flex;
  justify-content: center;
`;
interface BalanceCompoProps {
  showText?: boolean;
  showImg?: boolean;
}

function BalanceCompo({ showText = true, showImg = true }: BalanceCompoProps) {
  const balancequestion = "ABC 기업의 주식을 구매하시겠습니까?";
  const handleClick = () => {
    console.log("버튼이 클릭되었습니다!");
  };

  return (
    <Container height="100%" flexDirection="column">
      <Container height="10%" overflowy="hidden">
        {showText && <TextBox height="100%">오늘의 밸런스 게임</TextBox>}
      </Container>
      <WhiteBox1 height="75%" marginB="5%" flexDirection="column">
        <Container height="10%" justifyContent="end">
          {showImg && (
            <EmogiBox
              backImg={`${LeftArrow}`}
              width="7%"
              height="100%"
              onClick={handleClick}
            />
          )}
        </Container>
        <Container height="53%" flexDirection="column">
          <EmogiBox backImg={`${Newspaper}`} width="45%" height="100%" />
          <Click>
            <News />
          </Click>
        </Container>
        <Container height="15%">
          <TextBox
            fontSize="1rem"
            height="100%"
            marginL="0%"
            justifyContent="center"
          >
            {balancequestion}
          </TextBox>
        </Container>
        <Container height="20%">
          <Button backgroundcolor="#FBD56E" border="0">
            산다
          </Button>
          <Button backgroundcolor="F4F4F4" border="0">
            안산다
          </Button>
        </Container>
      </WhiteBox1>
    </Container>
  );
}

export default BalanceCompo;
