import styled from "styled-components";

interface EmogiBoxProps {
  width?: string;
  height?: string;
  backImg: string;
  borderA?: string;
}

export const EmogiBox = styled.div<EmogiBoxProps>`
  // border: 1px solid red;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  background-image: url(${(props) => props.backImg});
  background-size: 100% 100%;
  border-radius: ${(props) => props.borderA};
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

interface ImgBoxProps {
  display?: string | null;
  justifycontent?: string | null;
  backgroundcolor?: string | null;
  width?: string | null;
  height?: string | null;
  borderradius?: string | null;
  alignitems?: string | null;
}
export const ImgBox = styled.div<ImgBoxProps>`
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : "space-evenly"};
  background-color: ${(props) =>
    props.backgroundcolor ? props.backgroundcolor : "transparent"};
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};
  border-radius: ${(props) => (props.borderradius ? props.borderradius : "")};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
`;
