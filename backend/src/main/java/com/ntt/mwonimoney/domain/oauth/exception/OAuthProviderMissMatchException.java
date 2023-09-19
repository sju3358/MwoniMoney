package com.ntt.mwonimoney.domain.oauth.exception;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class OAuthProviderMissMatchException extends RuntimeException {

	public OAuthProviderMissMatchException(String msg) {
		super(msg);
		log.error("OAuthProviderMissMathchException : {} ", msg);
	}
}
