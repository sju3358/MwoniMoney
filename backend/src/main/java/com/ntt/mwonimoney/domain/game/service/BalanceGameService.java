package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;

@Service
public interface BalanceGameService {

	List<BalanceGameDto> getBalanceGames();

	// public BalanceGameDto getTodayBalanceGame() {
	//
	// }

	BalanceGameDto getBalanceGameInfo(Long balanceGameIdx);

	@Transactional
	void addBalanceGame(BalanceGameDto balanceGameDto);

	@Transactional
	void editBalanceGame(BalanceGameDto balanceGameDto);

	@Transactional
	void closeBalanceGame(Long balanceGameIdx);

	@Transactional
	void removeBalanceGame(Long balanceGameIdx);
}
