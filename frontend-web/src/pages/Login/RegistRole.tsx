import React from "react";
import { Container } from "../../components/Common/About/AboutContainer";
import RoleSelect from "../../components/Common/MyPage/RoleSelect";
import { Logo } from "./LoginPage";

function RegistRole() {
  return (
    <Container height="100vh" flexDirection="column" justifyContent="start">
      <Container height="50%" justifyContent="center">
        <Logo />
      </Container>
      <Container height="50%">
        <Container height="75%">
          <RoleSelect />
        </Container>
      </Container>
    </Container>
  );
}

export default RegistRole;
