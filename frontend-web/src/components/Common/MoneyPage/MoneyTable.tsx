import React from "react";
import { Container } from "../About/AboutContainer";
import { TextBox } from "../About/AboutText";
import { EmogiBox } from "../About/AboutEmogi";

interface MoneyTableProps {
  emogi: string;
  expense_detail: string; // 지출내역
  expense_date: string; // 지출날짜
  spending: number;
}

function MoneyTable(props: MoneyTableProps) {
  const { emogi, expense_detail, expense_date, spending } = props;

  // Determine the background color based on spending
  const backgroundColor = spending > 0 ? "#b9deb3" : "#ffa27e";

  return (
    <table
      style={{
        // border: "1px solid gold",
        width: "360px",
        height: "500px",
        overflow: "auto",
        margin: "3%",
      }}
    >
      <tbody>
        <tr>
          <td>
            <Container height="67px">
              <Container
                height="100%"
                width="20%"
                radius="50%"
                backcolor={backgroundColor} // Apply the background color here
              >
                <EmogiBox backImg={emogi} />
              </Container>
              <Container height="100%" width="50%" flexDirection="column">
                <TextBox width="100%" fontSize="1.3em">
                  {expense_date}
                </TextBox>
                <TextBox width="100%" fontSize="1em">
                  {expense_detail}
                </TextBox>
              </Container>
              <Container height="100%" width="30%">
                <TextBox
                  fontSize="1.2em"
                  fontcolor={backgroundColor}
                  fontWeight="bold"
                >
                  {spending} 원
                </TextBox>
              </Container>
            </Container>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MoneyTable;
