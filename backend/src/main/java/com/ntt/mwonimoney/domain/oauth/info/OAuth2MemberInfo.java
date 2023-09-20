package com.ntt.mwonimoney.domain.oauth.info;

import java.time.LocalDate;
import java.util.Map;

public abstract class OAuth2MemberInfo {

	protected Map<String, Object> attributes;

	public OAuth2MemberInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getId();

	public abstract String getName();

	public abstract String getBirthday();

}