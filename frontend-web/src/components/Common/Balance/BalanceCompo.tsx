import React from "react";
import styled from "styled-components";
import Newspaper from "../../../assests/image/main/Newspaper.png";
import LeftArrow from "../../../assests/image/main/LeftArrow.png";
import { Link } from "react-router-dom";
import { WhiteBox } from "../About/AboutWhilteContainer";
import { useNavigate } from "react-router";

/**
 *
 * style
 */

const BalanceContainer = styled.div`
  // border: 1px solid black;
  padding: 7%;
  width: 100%;
  height: 80%;
`;

interface TextProps {
  fontsize?: string | null;
  fontcolor?: string | null; // 'String' -> 'string'
  fontpadding?: string | null;
  fontweight?: string | null;
  textalign?: string | null;
}

const Text = styled.div<TextProps>`
  // border: 1px solid black;
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  color: ${(props) => (props.fontcolor ? props.fontcolor : "black")};
  padding: ${(props) => (props.fontpadding ? props.fontpadding : "0%")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  text-align: ${(props) => (props.textalign ? props.textalign : "")};
`;
const Text_no = styled.div<TextProps>`
  // border: 1px solid black;
  display: flex;
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  color: ${(props) => (props.fontcolor ? props.fontcolor : "black")};
  padding: ${(props) => (props.fontpadding ? props.fontpadding : "0%")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  text-align: ${(props) => (props.textalign ? props.textalign : "")};
`;

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
const Img = styled.img<ImgProps>`
  // border: 1px solid black;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
`;
const Img_no = styled.img<ImgProps>`
  // border: 1px solid black;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
`;
interface ImgBoxProps {
  justifycontent?: string | null;
}
const ImgBox = styled.div<ImgBoxProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : "space-evenly"};
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

interface BalanceCompoProps {
  showText?: boolean;
  showImg?: boolean;
  questionText: string; // Add prop for question text
  buyText: string; // Add prop for "산다" text
  notBuyText: string; // Add prop for "안산다" text
}

function BalanceCompo({
  showText = true,
  showImg = true,
  questionText,
  buyText,
  notBuyText,
}: BalanceCompoProps) {
  const handleClick = () => {
    console.log("버튼이 클릭되었습니다!");
  };

  const GoGoalMoney = () => {
    navigate("/Balance");
  };
  return (
    <BalanceContainer>
      {showText && (
        <Text_no fontpadding="0% 0% 5% 0%" fontweight="700">
          오늘의 밸런스 게임
        </Text_no>
      )}
      <WhiteBox width="100%" onClick={GoGoalMoney}>
        {showImg && (
          <Link to="/Balance">
            <ImgBox justifycontent="right">
              <Img_no
                src={`${LeftArrow}`}
                width="7%"
                height="7%"
                onClick={handleClick}
              />
            </ImgBox>
          </Link>
        )}
        <ImgBox>
          <Img src={`${Newspaper}`} width="25%" height="25%" />
        </ImgBox>
        <ClickButton>
          <Text
            fontsize="0.625rem"
            fontcolor="#FFFFFF"
            fontweight="600"
            textalign="center"
          >
            {questionText}
          </TextBox>
        </Container>
        <Container height="20%">
          <Button backgroundcolor="#FBD56E" border="0">
            {buyText}
          </Button>
          <Button backgroundcolor="F4F4F4" border="0">
            {notBuyText}
          </Button>
        </ButtonBox>
      </WhiteBox>
    </BalanceContainer>
  );
}

export default BalanceCompo;
