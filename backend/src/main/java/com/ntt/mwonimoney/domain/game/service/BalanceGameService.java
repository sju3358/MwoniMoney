package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import org.springframework.data.domain.Slice;

import com.ntt.mwonimoney.domain.game.api.request.BalanceGameListRequest;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

public interface BalanceGameService {

	Slice getEndBalanceGames(BalanceGameListRequest request);

	List<BalanceGameDto> getBalanceGames(BalanceGameStatus status);

	BalanceGameDto getTodayBalanceGame();

	BalanceGameDto getBalanceGameInfo(Long balanceGameIdx);
}
