package com.ntt.mwonimoney.global.exception;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class CommonHandler {

	@ExceptionHandler
	public ResponseEntity noSuchElementExceptionHandler(NoSuchElementException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity illegalArgumentException(IllegalArgumentException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity<String> handleNotFoundException(NoHandlerFoundException e) {
		log.info(e.getMessage());
		return ResponseEntity.status(404).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity handleBadRequestException(MethodArgumentNotValidException e) {
		return ResponseEntity.status(400).body(e.getMessage());
	}

	@ExceptionHandler
	public ResponseEntity exception(Exception e) {
		log.info(e.getMessage());
		return ResponseEntity.status(500).body(e.getMessage());
	}
}
