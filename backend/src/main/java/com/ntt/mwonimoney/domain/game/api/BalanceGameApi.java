package com.ntt.mwonimoney.domain.game.api;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.service.BalanceGameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BalanceGameApi {

	private final BalanceGameService balanceGameService;

	@GetMapping("/balances")
	public ResponseEntity getListOfBalance(Pageable pageable) {

		Slice<BalanceGameDto> responseData = balanceGameService.getBalanceGames(pageable);
		Pageable pageable = Pageable

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(responseData);
	}

}
