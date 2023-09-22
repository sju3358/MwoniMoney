package com.ntt.mwonimoney.domain.game.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.amazonaws.Response;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler
	public ResponseEntity handleGameDeactivateException(GameDeactivateException e){

		String errorMessage = e.getMessage();

		return ResponseEntity.badRequest().body(errorMessage);
	}
}
