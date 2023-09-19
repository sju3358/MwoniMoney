package com.ntt.mwonimoney.domain.oauth.info.inpl;

import java.time.LocalDate;
import java.util.Map;

import com.ntt.mwonimoney.domain.oauth.info.OAuth2MemberInfo;

public class KakaoOAuth2MemberInfo extends OAuth2MemberInfo {

	public KakaoOAuth2MemberInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return (String)attributes.get("id").toString();
	}

	@Override
	public String getName() {
		Map<String, Object> properties = (Map<String, Object>)attributes.get("properties");

		if (properties == null) {
			return null;
		}

		return (String)properties.get("nickname");
	}

	@Override
	public LocalDate getBirthday() {
		Map<String, Object> account = (Map<String, Object>)attributes.get("kakao_account");
		return (LocalDate)account.get("birthDay");
	}
}
