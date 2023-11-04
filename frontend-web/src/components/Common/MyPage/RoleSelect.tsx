import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { userDataState } from "../../../states/UserInfoState";
import { Container } from "../About/AboutContainer";
import { useRecoilState } from "recoil";
import { ModalBtn } from "../../../modal/ModalBtn1";
import api from "../../../apis/Api";

import { useNavigate } from "react-router";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function RoleSelect() {
  const [selectedValue, setSelectedValue] = useState("");
  const [userData, setUserData] = useRecoilState(userDataState);

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = (event: any) => {
    setUserData((userData: any) => ({
      ...userData,
      memberRole: selectedValue,
    }));
    try {
      api
        .post("/v1/members/role", {
          memberRole: selectedValue,
        })
        .catch((e) => {
          console.log(e);
        });

      navigate("/Mypage");
    } catch (error) {
      alert("axios 실패");
      console.error(error);
      throw error;
    }
  };
  return (
    <>
      <Container height="70%">
        <RadioGroup
          value={selectedValue}
          onChange={handleChange}
          defaultValue=""
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
          sx={{
            flexDirection: "row",
          }}
        >
          <FormControlLabel value="PARENT" control={<BpRadio />} label="부모" />
          <FormControlLabel value="CHILD" control={<BpRadio />} label="아이" />
        </RadioGroup>
      </Container>
      <Container height="30%" width="40%">
        <ModalBtn
          modalBtn_height="50%"
          modalBtn_width="80%"
          onClick={handleClick}
        >
          저장
        </ModalBtn>
      </Container>
    </>
  );
}
