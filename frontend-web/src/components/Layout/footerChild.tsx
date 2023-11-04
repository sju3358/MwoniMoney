import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import { FooterBody } from "./footer";
import { useNavigate } from "react-router-dom";

export default function FooterChild() {
  const [value, setValue] = React.useState("recents");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const GoHome = () => {
    navigate("/");
  };

  const GoMoneyPage = () => {
    navigate("/MoneyPage");
  };

  const GoChallenge = () => {
    navigate("/Challenge");
  };

  const GoBank = () => {
    navigate("/Bank");
  };

  const GoMyPage = () => {
    navigate("/MyPage");
  };

  return (
    <FooterBody>
      <BottomNavigation
        sx={{
          width: "100%",
          height: "95%",
          margin: "0%",
          padding: "0%",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          onClick={GoHome}
          value="Main"
          icon={
            <HomeIcon sx={{ width: "50%", height: "50%", color: "#969696" }} />
          }
          sx={{
            height: "95%",
            margin: "0%",
            padding: "0%",
            color: "#FF0000",
          }}
        />
        <BottomNavigationAction
          onClick={GoMoneyPage}
          value="MoneyPage"
          // label="용돈기입장"
          icon={
            <ReceiptLongIcon
              sx={{
                width: "50%",
                height: "50%",
                color: "#969696",
              }}
            />
          }
          sx={{
            height: "95%",
            margin: "0%",
            padding: "0%",
          }}
        />
        <BottomNavigationAction
          onClick={GoChallenge}
          value="Challenge"
          // label="챌린지"
          icon={
            <WorkspacePremiumIcon
              sx={{
                width: "50%",
                height: "50%",
                color: "#969696",
              }}
            />
          }
          sx={{
            height: "95%",
            margin: "0%",
            padding: "0%",
          }}
        />
        <BottomNavigationAction
          onClick={GoBank}
          value="Bank"
          icon={
            <AccountBalanceIcon
              sx={{
                width: "50%",
                height: "50%",
                color: "#969696",
              }}
            />
          }
          sx={{
            height: "95%",
            margin: "0%",
            padding: "0%",
          }}
        />

        <BottomNavigationAction
          onClick={GoMyPage}
          value="Setting"
          icon={
            <SettingsIcon
              sx={{
                width: "50%",
                height: "50%",
                color: "#969696",
              }}
            />
          }
          sx={{
            height: "95%",
            margin: "0%",
            padding: "0%",
          }}
        />
      </BottomNavigation>
    </FooterBody>
  );
}
