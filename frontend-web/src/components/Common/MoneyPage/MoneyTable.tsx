import React from "react";
import styled from "styled-components";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import { EmogiBox } from "../About/AboutEmogi";
import Img from "../../../assests/image/Pig.png";

function MoneyTable() {
  return (
    <table style={{ border: "1px solid black", width: "95%", height: "100%" }}>
      <tbody>
        <tr>
          <td>
            <Container height="30%">
              <Container height="100%" width="20%">
                <EmogiBox backImg="Img" />
              </Container>
              <Container height="100%" width="50%" flexDirection="column">
                <TextBox width="100%" fontSize="1.3em">
                  지출내역
                </TextBox>
                <TextBox width="100%" fontSize="1em">
                  지출날짜
                </TextBox>
              </Container>
              <Container height="100%" width="30%"></Container>
            </Container>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default MoneyTable;
