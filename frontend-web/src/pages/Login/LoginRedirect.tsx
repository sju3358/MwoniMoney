import React, { useEffect } from "react";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { memberUuidState } from "../../states/UserInfoState"; // 경로를 실제 상황에 맞게 수정

// JWT 토큰의 형태를 정의
interface JwtToken {
  sub: string;
  exp: number;
  auth: string;
  // 다른 필드들도 필요한 경우 여기에 추가
}

function KakaoLoginRedirect() {
  const [userInfo, setUserInfo] = useRecoilState(memberUuidState);

  useEffect(() => {
    // URL에서 JWT 토큰 추출 (카카오 로그인 콜백에서 전달된 토큰)
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // JWT 토큰 디코딩
      const decodedToken = jwt<JwtToken>(accessToken);

      console.log(decodedToken);

      // 새로운 사용자 정보 객체 생성
      const updatedUserInfo = {
        userUuid: decodedToken.sub,
      };

      const uuid = decodedToken.sub;

      // Recoil 상태 업데이트
      setUserInfo(updatedUserInfo);

      //   // 토큰을 localStorage에 저장 (옵션)
      //   localStorage.setItem("accessToken", accessToken);
    }
    // 리디렉션 (예: 홈 페이지로)
    window.location.href = `${process.env.REACT_APP_BASE_URL}`; // 홈 페이지 URL로 변경
  }, []);

  return <div>Redirecting... {/* 리디렉션 중 메시지 또는 로딩 스피너 */}</div>;
}

export default KakaoLoginRedirect;
