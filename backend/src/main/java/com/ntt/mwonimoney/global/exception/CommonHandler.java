package com.ntt.mwonimoney.global.exception;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonHandler {

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(NoSuchElementException e) {
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(IllegalArgumentException e) {
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(Exception e) {
		return ResponseEntity.status(500).body(e.getMessage());
	}
}
