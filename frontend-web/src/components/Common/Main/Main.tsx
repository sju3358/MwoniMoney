import styled from "styled-components";

export const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

{
  /* Text 넣는 칸 */
}

export const TextContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  padding: 5%;
`;

export const TextMentBox = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface TextProps {
  color?: string | null;
  fontsize?: string | null;
  fontstyle?: string | null;
  fontweight?: string | null;
  margin?: string | null;
  padding?: string | null;
}
export const Text = styled.div<TextProps>`
  // border: 1px solid blue;
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
`;

export const TextEmojiBox = styled.div`
  // border: 1px solid red;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EmogiProps {
  url: string;
  width: string;
  height: string;
}

export const Emoji = styled.div<EmogiProps>`
  // border: 1px solid red;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
`;

{
  /* 밸런스 게임 칸 */
}

interface BalanceProps {
  height: string;
}

export const BalanceContainer = styled.div<BalanceProps>`
  // border: 1px solid blue;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
`;

{
  /* 퀴즈 칸 */
}

interface QuizProps {
  height: string;
}

export const QuizContainer = styled.div<QuizProps>`
  // border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

{
  /* 챌린지 칸 */
}

interface ChallengeProps {
  height: string;
}

export const ChallengeContainer = styled.div<ChallengeProps>`
  // border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
