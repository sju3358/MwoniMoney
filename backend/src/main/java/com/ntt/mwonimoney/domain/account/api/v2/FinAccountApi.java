package com.ntt.mwonimoney.domain.account.api.v2;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController(value = "FinAccountApiV2")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
@Slf4j
public class FinAccountApi {
	@GetMapping("/accounts")
	public ResponseEntity getFinAccountRequest(@RequestHeader("Authorization") String accessToken,
		@RequestParam(name = "type", required = true) String type) {

		//핀어카운트 조회

		return null;
	}

	@PostMapping("/accounts")
	public ResponseEntity openFinAccountRequest(@RequestHeader("Authorization") String accessToken,
		@RequestBody String accountNumber) {

		//핀어파운트 발급

		return null;
	}

}
