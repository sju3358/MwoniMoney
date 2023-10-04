import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px 10px 10px 10px",

  "&:not(:last-child)": {
    borderBottom: 0,
    margin: "0% 0% 5% 0%",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", transform: "rotate(90deg)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>1. 자녀 핀 어카운트 어떻게 발급하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            우선 자녀를 회원가입시킨 후 부모 메인페이지에서 QR발급에 들어가세요.
            그 후 자녀 핸드폰으로 큐알을 찍으면 상호 연결됩니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>2. 어플리케이션 알림을 설정하고싶어요.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>마이페이지 내에서 알림을 설정할 수 있습니다.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            3. 개명을 했습니다. 회원정보 수정은 어떻게 진행하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            고객센터에 문의주시면 2-3일의 처리기간 후 변경된 정보를 확인할실 수
            있습니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
