import React from "react";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { ListTitle, CategoryTag, DeadLine } from "../Challenge/ChallengeList";
import { Category } from "../About/AboutCategory";
import { TextBox } from "../About/AboutText";
import Button from "../About/AboutButton";
import ProgressBar from "./ProgressBar";

function LoanList() {
  const title = "돈 빌려주세요";
  return (
    <WhiteBox1 height="40%" flexDirection="column" marginB="5%">
      <Container height="40%">
        <ListTitle>
          <TextBox width="50%" marginL="0%" fontSize="1.2em" height="100%">
            {title}
          </TextBox>
          <CategoryTag>
            <Category backcolor="#fcdf92" width="90%" height="90%">
              대출중
            </Category>
          </CategoryTag>
          <DeadLine> ~2023/10/07</DeadLine>
        </ListTitle>
      </Container>
      <Container height="20%">
        <ProgressBar />
      </Container>
      <Container height="40%">
        <Button content="돈 갚기" width="50%" fontSize="1.2em" height="70%" />
      </Container>
    </WhiteBox1>
  );
}

export default LoanList;
