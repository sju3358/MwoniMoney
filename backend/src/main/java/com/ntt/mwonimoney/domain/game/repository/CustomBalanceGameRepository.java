package com.ntt.mwonimoney.domain.game.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;

public interface CustomBalanceGameRepository {
	Slice<BalanceGameDto> findSliceGamesBy(Pageable pageable);

	Optional<BalanceGameDto> findBalanceGameDtoByIdx(Long idx);

	Optional<BalanceGameDto> findTodayBalanceGameDto();
}
