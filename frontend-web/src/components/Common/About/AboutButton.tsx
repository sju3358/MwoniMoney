import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface ButtonProps {
  display?: string;
  justifyC?: string;
  alignI?: string;
  width?: string;
  height?: string;
  backcolor?: string;
  fontS?: string;
  bordercolor?: string;
  afbackcolor?: string;
  borderR?: string;
  margin?: string;
  padding?: string;
  border?: string;
}

const Button = styled.button<ButtonProps>`
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) => (props.justifyC ? props.justifyC : "center")};
  align-items: ${(props) => (props.alignI ? props.alignI : "center")};

  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};

  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};

  font-size: ${(props) => (props.fontS ? props.fontS : "1.7em")};
  font-weight: bold;

  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};

  border-radius: ${(props) => (props.borderR ? props.borderR : "10px")};
  border: ${(props) => (props.bordercolor ? props.bordercolor : "none")};

  &:active {
    background-color: ${(props) =>
      props.afbackcolor ? props.afbackcolor : props.backcolor};
    transform: ${(props) => (props.afbackcolor ? "translate(0em, 0.2em)" : "")};
    box-shadow: ${(props) =>
      props.afbackcolor ? "inset 0 0 3px rgba(0, 0, 0, 0.2)" : ""};
  }
`;

export default Button;
