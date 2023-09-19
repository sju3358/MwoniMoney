import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

//
import styledd from "styled-components";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.9rem",
          transform: "rotate(90deg)",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)", //화살표 방향
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

//커스텀 시작
//보기 번호
const ExampleNumber = styledd.span`
font-size:0.75rem;`;

const ExampleText = styledd.span`
font-size:0.75rem;`;

const ChatGptBtn = styledd.div`
  
`;

//------------------------------------------------------------
export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  //초기값은 panel1

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      //삼항연산자
      //newExpanded가 true이면 setExpanded에 의해 expanded값을 panel로, false면 false로 설정
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        {/* <Typography>첫 번째</Typography> */}
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ExampleNumber>1</ExampleNumber>
          <ExampleText>그린백</ExampleText>
        </Typography>
        <Typography>
          <ExampleNumber>2</ExampleNumber>
          <ExampleText>다크패턴</ExampleText>
        </Typography>
        <Typography>
          <ExampleNumber>3</ExampleNumber>
          <ExampleText>레몬마켓</ExampleText>
        </Typography>
        <Typography>
          <ExampleNumber>4</ExampleNumber>
          <ExampleText>화이트리스트</ExampleText>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
