package com.ntt.mwonimoney.domain.account.api.v2;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ntt.mwonimoney.domain.member.api.request.SmallAccountRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController(value = "SmallAccountApi")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
@Slf4j
public class SmallAccountApi {

	@GetMapping("/accounts/small-account/{finAccountIdx}/remain")
	public ResponseEntity getSmallAccountBalanceRequest(@PathVariable Long finAccountIdx) {

		//짜금통 잔액 확인

		return null;
	}

	@PostMapping("/accounts/small-account")
	public ResponseEntity openSmallAccountRequest(@RequestHeader("Authorization") String accessToken,
		@RequestPart(value = "info") SmallAccountRequest request,
		@RequestPart(value = "image") MultipartFile file) throws IOException {
		return null;

		//짜금통 생성
	}

	@PatchMapping("/accounts/small-account/{finAccountIdx}")
	public ResponseEntity closeSmallAccountRequest(@PathVariable Long finAccountIdx) {

		//짜금통 닫기

		return null;
	}

}
