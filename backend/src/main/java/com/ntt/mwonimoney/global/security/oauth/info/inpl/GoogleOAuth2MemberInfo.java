package com.ntt.mwonimoney.global.security.oauth.info.inpl;

import java.util.Map;

import com.ntt.mwonimoney.global.security.oauth.info.OAuth2MemberInfo;

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
	public String getEmail() {
		return (String)attributes.get("email");
	}
}
