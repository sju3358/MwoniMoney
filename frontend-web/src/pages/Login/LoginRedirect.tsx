import React, { useEffect } from "react";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { userDataState } from "../../states/UserInfoState";
import axios, { AxiosResponse } from "axios";
import { api } from "../../apis/Api";
// import { number } from "yargs";
import { userDataProps } from "../../states/UserInfoState";
import { useNavigate } from "react-router";

// JWT 토큰의 형태를 정의
interface JwtToken {
  sub: string;
  exp: number;
  auth: string;
  // 다른 필드들도 필요한 경우 여기에 추가
}

// Axios 요청 전에 요청 URL을 콘솔에 출력하는 인터셉터
axios.interceptors.request.use(
  (config: any) => {
    console.log("Request URL:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface PostRegisterProps {
  bearerToken: string;
}

export const postRegister = (
  props: PostRegisterProps
): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/members", {
    headers: {
      Authorization: `Bearer ${props.bearerToken}`,
    },
  });
};

function KakaoLoginRedirect() {
  const [userInfo, setUserInfo] = useRecoilState(userDataState);
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 JWT 토큰 추출 (카카오 로그인 콜백에서 전달된 토큰)
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // JWT 토큰 디코딩
      const decodedToken = jwt<JwtToken>(accessToken);

      localStorage.setItem("token", accessToken);

      // postRegister를 사용하여 데이터를 가져오기
      postRegister({ bearerToken: accessToken })
        .then((response) => {
          // 데이터를 성공적으로 받았을 때의 처리
          console.log("postRegister 응답 데이터:", response.data);

          // 사용자 정보 업데이트
          const updatedUserInfo: userDataProps = {
            idx: decodedToken.sub,
            uuid: response.data.idx,
            status: response.data.status,
            name: response.data.name,
            nickname: response.data.nickname,
            birthday: response.data.birthday,
            socialProvider: response.data.socialProvider,
            socialId: response.data.socialId,
            memberRole: response.data.memberRole,
            email: response.data.email,
          };

          setUserInfo(updatedUserInfo);

          // 리디렉션 (예: 홈 페이지로)
          if (userInfo.memberRole == "GUEST") {
            navigate("/RegistRole");
          } else {
            window.location.href = `${process.env.REACT_APP_BASE_URL}`;
          }
        })
        .catch((error) => {
          // 에러가 발생했을 때의 처리
          console.error("postRegister 오류:", error);
        });
    }
  }, []);

  return <div>Redirecting...</div>;
}

export default KakaoLoginRedirect;
