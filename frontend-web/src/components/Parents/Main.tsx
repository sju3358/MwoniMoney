import styled from "styled-components";
import Money from "../../assests/image/Money.png";

export const MainContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
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
  border: 1px solid black;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
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

export const Emoji = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  background-image: url(${Money});
  background-size: 100% 100%;
`;

{
  /* 정기용돈 넣는 칸 */
}

export const AllowanveContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WhiteBox = styled.div`
  // border: 1px solid black;
  border-radius: 8px;
  width: 90%;
  height: 90%;
  background-color: #ffffff;
`;

{
  /* 특별용돈 넣는 칸 */
}

{
  /* QR 넣는 칸 */
}

export const QrContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;