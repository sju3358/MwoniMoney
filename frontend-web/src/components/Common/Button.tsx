import React from "react";
import styled from "styled-components";

interface BtnProps {
  width?: string;
  height?: string;
  backColor?: string;
  fontSize?: string;
}

const Btn = styled.div<BtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  background-color: ${(props) =>
    props.backColor ? props.backColor : "#fbd56e"};
  border-radius: 10px;
  font-weight: bold;
`;

interface ButtonProps {
  content: string;
  width?: string;
  height?: string;
  backColor?: string;
  fontSize?: string;
}

function Button({ content, width, height, backColor, fontSize }: ButtonProps) {
  return (
    <Btn
      width={width}
      height={height}
      backColor={backColor}
      fontSize={fontSize}
    >
      {content}
    </Btn>
  );
}

export default Button;
