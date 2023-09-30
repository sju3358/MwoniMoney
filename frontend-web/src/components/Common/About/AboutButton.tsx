import React from "react";
import styled from "styled-components";

interface BtnProps {
  width?: string;
  height?: string;
  backcolor?: string;
  fontS?: string;
}

export const Btn = styled.div<BtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) => (props.fontS ? props.fontS : "1.7em")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};
  border-radius: 10px;
  font-weight: bold;
`;

interface ButtonProps {
  content: string;
  width?: string;
  height?: string;
  backcolor?: string;
  fontS?: string;
}

function Button({ content, width, height, backcolor, fontS }: ButtonProps) {
  return (
    <Btn width={width} height={height} backcolor={backcolor} fontS={fontS}>
      {content}
    </Btn>
  );
}

export default Button;
