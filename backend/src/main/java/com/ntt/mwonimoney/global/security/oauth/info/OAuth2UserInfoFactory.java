package com.ntt.mwonimoney.global.security.oauth.info;

import java.util.Map;

import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.global.security.oauth.info.inpl.GoogleOAuth2MemberInfo;
import com.ntt.mwonimoney.global.security.oauth.info.inpl.KakaoOAuth2MemberInfo;

public class OAuth2UserInfoFactory {

	public static OAuth2MemberInfo getOAuth2UserInfo(SocialProvider socialProvider, Map<String, Object> attributes) {
		return switch (socialProvider) {
			case GOOGLE -> new GoogleOAuth2MemberInfo(attributes);
			case KAKAO -> new KakaoOAuth2MemberInfo(attributes);
		};
	}
}