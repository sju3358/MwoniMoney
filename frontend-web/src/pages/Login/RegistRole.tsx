import React from "react";
import { useRecoilState } from "recoil";

import { Container } from "../../components/Common/About/AboutContainer";
import RoleSelect from "../../components/Common/MyPage/RoleSelect";
import { userCheckState, userDataState } from "../../states/UserInfoState";
import { Logo } from "./LoginPage";

function RegistRole() {
  const [userData, setUserData] = useRecoilState(userDataState);

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
