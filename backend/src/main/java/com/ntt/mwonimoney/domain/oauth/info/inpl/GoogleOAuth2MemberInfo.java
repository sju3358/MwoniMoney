package com.ntt.mwonimoney.domain.oauth.info.inpl;

import java.time.LocalDate;
import java.util.Map;

import com.ntt.mwonimoney.domain.oauth.info.OAuth2MemberInfo;

public class GoogleOAuth2MemberInfo extends OAuth2MemberInfo {

	public GoogleOAuth2MemberInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return (String)attributes.get("sub");
	}

	@Override
	public String getName() {
		return (String)attributes.get("name");
	}

	@Override
	public LocalDate getBirthday() {
		return (LocalDate)attributes.get("birthDay");
	}
}
