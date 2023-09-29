package com.ntt.mwonimoney.global.security.oauth.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ntt.mwonimoney.global.security.oauth.exception.UnAuthorizationException;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler
	public ResponseEntity unAuthorizationExceptionHandler(UnAuthorizationException e) {

		return ResponseEntity.badRequest().body(e.getMessage());
	}
}
