import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Logo = styled.div`
  /* 로고 이미지 스타일 설정 */
  width: 61.67%;
  height: 30.44%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/mainlogo.png);
  background-size: 100% 100%;
  position: absolute;
  left: 19.31vw;
  top: 24.13vh;
`;

const KaKaoLogin = styled.div`
  /* 카카오 로그인 이미지 스타일 설정 */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/KaKaoLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 59.38%;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하게 함 */
`;

const GoogleLogin = styled.div`
  /* 구글 로그인 이미지 스타일 설정 */
  width: 84.72%;
  height: 7.81%;
  background-image: url(${process.env
    .PUBLIC_URL}/images/StartPage/GoogleLogin.png);
  background-size: 100% 100%;
  position: absolute;
  left: 7.78%;
  top: 70.19%;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하게 함 */
`;

function MyComponent() {
  // KaKaoLogin 클릭 이벤트 핸들러
  const handleKaKaoLoginClick = () => {
    // 여기에서 카카오 로그인 처리를 수행하거나 필요한 동작을 수행할 수 있음
    console.log("KaKaoLogin 클릭됨");
  };

  // GoogleLogin 클릭 이벤트 핸들러
  const handleGoogleLoginClick = () => {
    // 여기에서 구글 로그인 처리를 수행하거나 필요한 동작을 수행할 수 있음
    console.log("GoogleLogin 클릭됨");
  };

  const KakaoLogin = () => {
    const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
      <img
        alt="카카오 로그인"
        src="image/kakaoLogin.png"
        width="255"
        height="35"
        style={{ margin: "0px 24px 16px 24px" }}
        onClick={() => (window.location.href = kakaoURL)}
      />
    );
  };

  const KakaoCallback = () => {
    useEffect(() => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");
      const grantType = "authorization_code";
      const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
      const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {},
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res: any) => {
          console.log(res);
          const { access_token } = res.data;
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                },
              }
            )
            .then((res: any) => {
              console.log("2번쨰", res);
            });
        })
        .catch((Error: any) => {
          console.log(Error);
        });
    }, []);

    return <></>;
  };

  return (
    <Container>
      <Logo />
      <KaKaoLogin onClick={handleKaKaoLoginClick} />
      <GoogleLogin onClick={handleGoogleLoginClick} />
    </Container>
  );
}

export default MyComponent;
