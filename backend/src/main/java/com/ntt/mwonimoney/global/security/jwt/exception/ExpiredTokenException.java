package com.ntt.mwonimoney.global.security.jwt.exception;

public class ExpiredTokenException extends RuntimeException {
	public ExpiredTokenException(String message) {
		super(message);
	}
}
