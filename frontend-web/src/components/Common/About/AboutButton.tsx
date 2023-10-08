import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface BtnProps {
  width?: string;
  height?: string;
  backcolor?: string;
  fontS?: string;
  bordercolor?: string;
  afbackcolor?: string;
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
  border: ${(props) => (props.bordercolor ? props.bordercolor : "none")};
  &:active {
    background-color: ${(props) =>
      props.afbackcolor ? props.afbackcolor : props.backcolor};
    transform: translate(0em, 0.2em);
  }
`;

interface ButtonProps {
  content: string;
  width?: string;
  height?: string;
  backcolor?: string;
  fontS?: string;
  click?: MouseEventHandler<HTMLDivElement>;
  bordercolor?: string;
  afbackcolor?: string;
}

function Button({
  content,
  width,
  height,
  backcolor,
  fontS,
  bordercolor,
  afbackcolor,
  click,
}: ButtonProps) {
  return (
    <Btn
      width={width}
      height={height}
      backcolor={backcolor}
      fontS={fontS}
      onClick={click}
      bordercolor={bordercolor}
      afbackcolor={afbackcolor}
    >
      {content}
    </Btn>
  );
}

export default Button;
