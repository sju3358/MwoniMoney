package com.ntt.mwonimoney.global.exception;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class CommonHandler {

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(NoSuchElementException e) {
		log.error(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(IllegalArgumentException e) {
		log.error(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(Exception e) {
		log.error(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}
}
