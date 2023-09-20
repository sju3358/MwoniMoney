import styled from "styled-components";

export const MainContainer = styled.div`
  border: 1px solid black;
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
  border: 1px solid black;
  width: 100%;
  height: 25%;
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
  // align-items: baseline;
`;

export const Text = styled.div`
  // border: 1px solid blue;
  color: #292929;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5%;
`;
export const Text_GR = styled.div`
  // border: 1px solid blue;
  color: #747476;
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5%;
`;
export const TextBold_SP = styled.span`
  // border: 1px solid blue;
  color: #292929;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 5%;
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
  // size: string;
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
  height: string; // 'String' -> 'string'
}

export const BalanceContainer = styled.div<BalanceProps>`
  border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  //
`;

{
  /* 퀴즈 칸 */
}

interface QuizProps {
  height: string; // 'String' -> 'string'
}

export const QuizContainer = styled.div<QuizProps>`
  border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  //
`;

{
  /* 챌린지 칸 */
}

interface ChallengeProps {
  height: string; // 'String' -> 'string'
}

export const ChallengeContainer = styled.div<ChallengeProps>`
  border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  //
`;
