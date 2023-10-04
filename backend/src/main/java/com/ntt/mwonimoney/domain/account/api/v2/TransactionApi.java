package com.ntt.mwonimoney.domain.account.api.v2;

import java.util.List;

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

	@GetMapping("/accounts/transactions")
	public ResponseEntity<List<FinAccountTransactionDto2>> getTransactionListRequest(
		@RequestHeader("Authorization") String accessToken, @RequestBody FinAccountTransactionListRequest request) {

		//거래내역 불러오기

		return null;
	}

	@PatchMapping("/accounts/{finAccountIdx}/transactions/{transactionIdx}")
	public ResponseEntity editTransactionMeoRequest(@PathVariable Long finAccountIdx, @PathVariable Long transactionIdx,
		@RequestBody String memoToUpdate) {

		//거래내역 메모 수정

		return null;
	}

	@PostMapping("/accounts/transfer")
	public ResponseEntity makeTransactionRequest(@RequestHeader("Authorization") String accessToken,
		@RequestBody FinAccountTransferRequest finAccountTransferRequest) {

		//1. 송금하기
		//2. 그에따른 송금기록 저장하기.

		return null;
	}

}
