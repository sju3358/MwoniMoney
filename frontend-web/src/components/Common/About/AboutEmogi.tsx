import styled from "styled-components";

interface EmogiBoxProps {
  width?: string;
  height?: string;
  backImg: string;
}

export const EmogiBox = styled.div<EmogiBoxProps>`
  // border: 1px solid red;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  background-image: url(${(props) => props.backImg});
  background-size: 100% 100%;
`;

//img (화살표, O,x답)
interface ImgProps {
  width?: string | null;
  height?: string | null;
  padding?: string | null;
}
export const Img = styled.img<ImgProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "1%")};
`;
export const ImgBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
