import React from "react";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { Container } from "../About/AboutContainer";
import { ListTitle, CategoryTag, DeadLine } from "../Challenge/ChallengeList";
import { Category } from "../About/AboutCategory";
import { TextBox } from "../About/AboutText";
import Button from "../About/AboutButton";
import { ProgressBar } from "./ProgressBar";
import { Text } from "../About/AboutText";

//recoil
import { getLoan } from "../../../states/LoanState";

//utils
import { dateFormat } from "../utils";

interface Props {
  data: getLoan;
}
function LoanList({ data }: Props) {
  return (
    <WhiteBox1 height="40%" flexDirection="column" marginB="5%">
      <Container height="40%">
        <ListTitle>
          <TextBox width="50%" marginL="0%" fontSize="1.2em" height="100%">
            {data.memo}
          </TextBox>
          <CategoryTag>
            {data.status === 0 && (
              <Category backcolor="#fcdf92" width="90%" height="90%">
                <Text fontsize="0.9rem" marginL="0%" fontweight="700">
                  대출중
                </Text>
              </Category>
            )}
          </CategoryTag>
          <DeadLine>~ {dateFormat(data.endTime)}</DeadLine>
        </ListTitle>
      </Container>
      <Container height="20%">
        <ProgressBar />
      </Container>
      <Container height="40%">
        <Button content="돈 갚기" width="50%" fontS="1.2em" height="70%" />
      </Container>
    </WhiteBox1>
  );
}

export default LoanList;
