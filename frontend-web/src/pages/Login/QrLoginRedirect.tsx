import React, { useEffect } from "react";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { userDataState } from "../../states/UserInfoState";
import axios, { AxiosResponse } from "axios";
import api from "../../apis/Api";

// JWT 토큰의 형태를 정의
interface JwtToken {
  sub: string;
  exp: number;
  auth: string;
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
  return api.get("/v1/members", {});
};

export const postRegisterChild = (
  uuid: string // uuid를 props로 받습니다.
): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정 등을 수행합니다.
  return api.post(`/v1/children/${uuid}`); // uuid를 경로에 삽입합니다.
};

function QrLoginRedirect() {
  const [userInfo, setUserInfo] = useRecoilState(userDataState);

  useEffect(() => {
    // URL에서 JWT 토큰 추출 (카카오 로그인 콜백에서 전달된 토큰)
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // JWT 토큰 디코딩
      const uuid = localStorage.getItem("parentuuid");
      const decodedToken = jwt<JwtToken>(accessToken);

      localStorage.setItem("token", accessToken);

      if (uuid) {
        // uuid가 null이 아닌 경우에만 postRegisterChild 호출
        postRegisterChild(uuid)
          .then((childResponse) => {
            // postRegisterChild의 응답을 처리합니다.
            console.log("postRegisterChild 응답 데이터:", childResponse.data);
          })
          .catch((childError) => {
            console.error("postRegisterChild 오류:", childError);
          });
      }
      // 리디렉션 (예: 홈 페이지로)
      window.location.href = `${process.env.REACT_APP_BASE_URL}`;
    }
  }, []);

  return <div>Redirecting...</div>;
}

export default QrLoginRedirect;
