package com.ntt.mwonimoney.domain.game.api;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.api.request.BalanceGameListRequest;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.service.BalanceGameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BalanceGameApi {

	private final BalanceGameService balanceGameService;

	@GetMapping("/balances")
	public ResponseEntity getBalanceGameList(BalanceGameListRequest request) {

		Slice<BalanceGameDto> responseData = balanceGameService.getBalanceGames(request);

		return ResponseEntity.ok().body(responseData);
	}

	@GetMapping("/balances/{balanceIdx}")
	public ResponseEntity getBalanceGameInfo(@PathVariable("balanceIdx") Long balanceGameIdx){

		BalanceGameDto responseData = balanceGameService.getBalanceGameInfo(balanceGameIdx);

		return ResponseEntity.ok().body(responseData);
	}

	@GetMapping("/balances/today")
	public ResponseEntity getBalanceGameToday(){

		BalanceGameDto responseData = balanceGameService.getTodayBalanceGame();

		return ResponseEntity.ok().body(responseData);
	}

}
