package com.ntt.mwonimoney.domain.oauth.info;

import java.util.Map;

import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.domain.oauth.info.inpl.GoogleOAuth2MemberInfo;
import com.ntt.mwonimoney.domain.oauth.info.inpl.KakaoOAuth2MemberInfo;

public class OAuth2UserInfoFactory {

	public static OAuth2MemberInfo getOAuth2UserInfo(SocialProvider socialProvider, Map<String, Object> attributes) {
		return switch (socialProvider) {
			case GOOGLE -> new GoogleOAuth2MemberInfo(attributes);
			case KAKAO -> new KakaoOAuth2MemberInfo(attributes);
		};
	}
}