package com.ntt.mwonimoney.domain.account.api.v2;

import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.GetTransactionResponseDto;
import com.ntt.mwonimoney.domain.account.model.dtoV2.GetTransactionRequestDto;
import com.ntt.mwonimoney.domain.account.service.v2.FinAccountTransactionServiceImplV2;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto2;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionListRequest;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransferRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController(value = "TransactionApiV2")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
@Slf4j
public class TransactionApi {

	private final JwtTokenProvider jwtTokenProvider;
	private final FinAccountTransactionServiceImplV2 finAccountTransactionServiceImplV2;
	private final MemberAuthService memberAuthService;
	@GetMapping("/accounts/transactions")
	public ResponseEntity getTransaction(
			@RequestHeader("Authorization") String accessToken, @RequestBody GetTransactionRequestDto getTransactionRequestDto) {
		//거래내역 불러오기
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		GetTransactionResponseDto result = finAccountTransactionServiceImplV2.getTransaction(memberIdx, getTransactionRequestDto);

		return ResponseEntity.ok().body(result);
	}

	@PatchMapping("/accounts/{finAccountIdx}/transactions/{transactionIdx}")
	public ResponseEntity editTransactionMeoRequest(@PathVariable Long finAccountIdx, @PathVariable Long transactionIdx,
		@RequestBody String memoToUpdate) {

		//거래내역 메모 수정

		return null;
	}

	@PostMapping("/accounts/transfer/parentstochild")
	public ResponseEntity sendMoneyparentstochild(@RequestHeader("Authorization") String accessToken,
		@RequestBody FinAccountTransferRequest finAccountTransferRequest) {

		//1. 부모 -> 자식 송금하기
		//2. 그에따른 송금기록 저장하기.

		return null;
	}

	@PostMapping("/accounts/transfer/accounttogoal")
	public ResponseEntity makeTransactionRequest(@RequestHeader("Authorization") String accessToken,
												 @RequestBody FinAccountTransferRequest finAccountTransferRequest) {

		//1. 짜금통 to 은행 송금하기
		//2. 그에따른 송금기록 저장하기.

		return null;
	}

}
