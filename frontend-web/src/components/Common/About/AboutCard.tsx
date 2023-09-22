import React from "react";
import styled from "styled-components";
import { TextBox } from "./AboutText";
import { WhiteBox1 } from "./AboutWhilteContainer";

interface AboutCardProps {
  title1: string;
  title2: string;
  content1: string | number;
  content2: string | number;
  backcolor1: string;
  backcolor2: string;
  width: string;
  fontweight?: string;
  fontsize1?: string;
  fontsize2?: string;
}

function AboutCard(props: AboutCardProps) {
  const {
    title1,
    title2,
    content1,
    content2,
    backcolor1,
    backcolor2,
    width,
    fontsize1 = "1.2em", // 기본값을 설정해줍니다.
    fontsize2 = "1em", // 기본값을 설정해줍니다.
    fontweight = "normal", // 기본값을 설정해줍니다.
  } = props;

  return (
    <>
      <WhiteBox1 width={width} backcolor={backcolor1} flexDirection="column">
        <TextBox fontSize={fontsize1}>{title1}</TextBox>
        <TextBox fontSize={fontsize2} fontWeight={fontweight}>
          {content1}
        </TextBox>
      </WhiteBox1>
      <WhiteBox1 width={width} backcolor={backcolor2} flexDirection="column">
        <TextBox fontSize={fontsize1}>{title2}</TextBox>
        <TextBox fontSize={fontsize2} fontWeight={fontweight}>
          {content2}
        </TextBox>
      </WhiteBox1>
    </>
  );
}

export default AboutCard;
