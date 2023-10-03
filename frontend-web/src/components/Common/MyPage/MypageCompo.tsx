import React, { useEffect, useState } from "react";
import {
  Emoji,
  MainContainer,
  Text,
  TextEmojiBox,
  TextMentBox,
} from "./MyPageStyle";
import { Container } from "../About/AboutContainer";
import { WhiteBox1 } from "../About/AboutWhilteContainer";
import { InputBox, TextBox } from "../About/AboutText";
import { useRecoilState } from "recoil";
import InputInfo from "./InputInfo";
import Notifications from "./Notifications";
import FAQ from "./FAQ";
import MypageModal from "../../../modal/Mypage/MypageModal";

import { userAccountState, userDataState } from "../../../states/UserInfoState";
import api from "../../../apis/Api";
import api_ver2 from "../../../apis/ApiForMultiPart";

function MypageCompo() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api
          .get("v1/members")
          .then((response) => {
            const receivedData = response.data;

            setUserData((prev) => ({
              ...prev,
              name: receivedData.name,
              birthday: receivedData.birthday,
              memberRole: receivedData.memberRole,
              status: receivedData.member_status,
              email: receivedData.email,
            }));
          })
          .catch((error) => {
            console.log("내정보 조회 " + error);
          });

        // 계좌번호 get하기
        await api_ver2
          .get("v1/accounts", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { type: "GENERAL" },
          })
          .then((response2) => {
            const receivedData2 = response2.data;
            setUserAccount((prev) => ({
              ...prev,
              account: receivedData2.number,
              status: receivedData2.status,
            }));
          })
          .catch((error) => {
            console.log("계좌조회 " + error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  //함수
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const saveAccount = () => {
    console.log(inputValue);
    api.post("v1/accounts", inputValue).then((response) => {
      console.log(response);
      setUserAccount(response.data);
    });
    alert("저장");
  };
  const account = userAccount.account;
  const status = userAccount.status;
  const name = userData.name; // api연결시 자녀1 이름으로 매핑
  const birth = userData.birthday;
  const email = userData.email;
  // console.log("account");
  // console.log(account);
  return (
    <MainContainer>
      {/* 페이지 제목 & 이미지 */}
      <Container width="100%" height="20%">
        <TextMentBox>
          <Text>{name}님</Text>
          <Text>안녕하세요!</Text>
        </TextMentBox>
        <TextEmojiBox>
          <Emoji />
        </TextEmojiBox>
      </Container>
      {/* 계좌번호 입력하는 칸 */}
      <Container height="30%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container height="30%">
            <TextBox fontSize="1.5em" height="100%">
              계좌번호
            </TextBox>
          </Container>

          <Container
            flexDirection="column"
            height="75%"
            justifyContent="center"
            align="center"
          >
            {status !== "ACTIVATE" ? (
              <TextBox
                height="40%"
                width="93%"
                fontSize="1em"
                fontWeight="normal"
                marginL="0%"
                style={{ borderBottom: "1px solid black" }}
              >
                <Container height="100%" width="80%">
                  <InputBox
                    height="100%"
                    width="100%"
                    fontsize="1.4em"
                    placeholder={"000-0000-0000-00"}
                    id={account}
                    onChange={handleInputChange}
                  />
                </Container>
                <Container
                  height="100%"
                  width="20%"
                  backcolor="#fbd56e"
                  onClick={saveAccount}
                >
                  추가
                </Container>
              </TextBox>
            ) : (
              <TextBox
                height="30%"
                width="93%"
                fontSize="1em"
                fontWeight="normal"
                marginL="0%"
                style={{ borderBottom: "1px solid black" }}
              >
                {account}
              </TextBox>
            )}
          </Container>
        </WhiteBox1>
      </Container>
      {/* 정보입력칸  */}
      <Container height="60%">
        <WhiteBox1
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            height="100%"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputInfo
              title="이름"
              info={`${name}`}
              placeholder="실명을 적어주세요"
              id="name"
            />
            <InputInfo
              title="생년월일"
              info={`${birth}`}
              placeholder="1997-03-20"
              id="birthday"
            />
            <InputInfo
              title="이메일"
              info={`${email}`}
              placeholder="email@domail.com"
              id="email"
            />
          </Container>
        </WhiteBox1>
      </Container>

      <Notifications />
      <FAQ />
      <MypageModal />
    </MainContainer>
  );
}

export default MypageCompo;
