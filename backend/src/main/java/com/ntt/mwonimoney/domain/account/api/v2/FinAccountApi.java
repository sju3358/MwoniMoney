package com.ntt.mwonimoney.domain.account.api.v2;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;
import com.ntt.mwonimoney.domain.account.service.v2.FinAccountServiceImplV2;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController(value = "FinAccountApiV2")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
@Slf4j
public class FinAccountApi {

	private final JwtTokenProvider jwtTokenProvider;
	private final FinAccountServiceImplV2 finAccountServiceImplV2;
	private final MemberAuthService memberAuthService;

	@GetMapping("/accounts")
	public ResponseEntity getFinAccountRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestParam(name = "type") FinAccountType type) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		FinAccountDto responseData = finAccountServiceImplV2.getFinAccount(memberIdx, type);

		return ResponseEntity.ok().body(responseData);
	}

	@PostMapping("/accounts")
	public ResponseEntity openFinAccountRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody String accountNumber) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		finAccountServiceImplV2.openGeneralFinAccount(memberIdx, accountNumber);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/accounts")
	public ResponseEntity closeFinAccountRequest(
		@RequestHeader("Authorization") String accessToken) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		finAccountServiceImplV2.closeFinAccount(memberIdx);

		return ResponseEntity.ok().build();
	}

}
