package com.ntt.mwonimoney.domain.game.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;

public interface BalanceGameService {

	Slice<BalanceGameDto> getBalanceGames(Pageable pageable);

	// public BalanceGameDto getTodayBalanceGame() {
	//
	// }

	BalanceGameDto getBalanceGameInfo(Long balanceGameIdx);
}
