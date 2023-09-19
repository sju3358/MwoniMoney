import styled from "styled-components";
import Pig from "../../assests/image/Pig.png";

export const MainContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

export const PigBoxBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  border: solid;
  box-sizing: border-box;
  padding: 10%;
`;

export const InTextContainer1 = styled.div`
  width: 80%;
  height: 100%;
`;

export const InTextContainer2 = styled.div`
  width: 20%;
  height: 100%;
`;


export const ChildrenList = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 15%;
  box-sizing: border-box;
`;

export const PigContainer = styled.div`
    border: 1px solid black;
    box-sizing: border-box;
    width: 100%;
    height: 20%;
    display: flex;
    padding: 3% 5%;
`;

export const PigBox = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 5px;
    background: var(--main-content-background, #FFF);
    padding: 5%
`;

export const PigRowBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const PigBigText = styled.div`
  // border: 1px solid blue;
  color: var(--text-color-active, #292929);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const PigSmallText = styled.div`
    color: var(--text-color-active, #292929);
    font-family: Inter;
    font-size: 1em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const Emoji = styled.div`
  // border: 1px solid red;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  background-image: url(${Pig});
  background-size: 100% 100%;
`;

export const TextContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  padding: 10%;
`;
export const TextMentBox = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFFFFF;
  // align-items: baseline;
`;

export const Text = styled.div`
  // border: 1px solid blue;
  color: var(--text-color-active, #292929);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
