package com.ntt.mwonimoney.domain.game.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;


public interface BalanceGameDtoRepository {
	Optional<BalanceGameDto> findBalanceGameDtoByIdx(Long idx);

	Optional<BalanceGameDto> findTodayBalanceGameDto();
}
