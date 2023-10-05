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

interface TextEmojiBoxProps {
  EmojiBox_justify?: string | undefined;
}

export const TextEmojiBox = styled.div<TextEmojiBoxProps>`
  // border: 1px solid red;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: ${(props) => props.EmojiBox_justify || "center"};
  align-items: center;
`;

interface EmogiProps {
  url: string;
  // size: string;
  width: string;
  height: string;
  emogi_margin?: string;
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
  /* 용돈 넣는 칸 */
}
