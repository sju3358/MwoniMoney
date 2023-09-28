package com.ntt.mwonimoney.domain.account.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.account.service.FinAccountService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FinAccountApi {

	private final FinAccountService finAccountService;

	@GetMapping("/accounts")
	public ResponseEntity getFinAccountList() {

		return ResponseEntity.ok().build();
	}

}
