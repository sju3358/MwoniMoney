package com.ntt.mwonimoney.domain.game.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.api.request.BalanceGameAnswerRequest;
import com.ntt.mwonimoney.domain.game.api.request.BalanceGameAnswerResponse;
import com.ntt.mwonimoney.domain.game.service.BalanceGameHistoryService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class BalanceGameHistoryApi {

	private final BalanceGameHistoryService balanceGameHistoryService;
	private final MemberAuthService memberAuthService;

	@GetMapping("/balances/{balanceIdx}/answer")
	public ResponseEntity<BalanceGameAnswerResponse> selectBalanceGameAnswer(
		@CookieValue("memberUUID") String memberUUID,
		@PathVariable Long balanceIdx,
		@RequestBody BalanceGameAnswerRequest request) {

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		balanceGameHistoryService.selectBalanceGameAnswer(balanceIdx, memberIdx, request.getSelectAnswer());

		BalanceGameAnswerResponse response = BalanceGameAnswerResponse.builder()
			.selectAnswer(request.getSelectAnswer())
			.build();

		return ResponseEntity.ok()
			.body(response);
	}

}
