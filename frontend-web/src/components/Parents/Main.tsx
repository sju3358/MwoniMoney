import styled from "styled-components";

export const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

export const ChildrenList = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 15%;
  box-sizing: border-box;
`;

{
  /* Text 넣는 칸 */
}

export const TextContainer = styled.div`
  // border: 1px solid black;
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
  /* 용돈 넣는 칸 */
}

interface AllowanceProps {
  height: string; // 'String' -> 'string'
}

export const AllowanveContainer = styled.div<AllowanceProps>`
  // border: 1px solid black;
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
  /* QR 넣는 칸 */
}

export const QrContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
`;
