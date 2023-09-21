package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.repository.BalanceGameRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BalanceGameServiceImpl implements BalanceGameService {

	private final BalanceGameRepository balanceGameRepository;

	@Override
	public Slice<BalanceGameDto> getBalanceGames(Pageable pageable) {

		Slice<BalanceGame> balanceGameEntities = balanceGameRepository.findBalanceGamesBy(pageable);

		if (balanceGameEntities.isEmpty() == true) {
			throw new NoSuchElementException();
		}

		List<BalanceGameDto> balanceGames = new ArrayList<>();

		for (BalanceGame balanceGameEntity : balanceGameEntities) {
			balanceGames.add(balanceGameEntity.convertToDto());
		}

		return new SliceImpl<>(balanceGames, balanceGameEntities.getPageable(), balanceGameEntities.hasNext());
	}

	// public BalanceGameDto getTodayBalanceGame() {
	//
	// }

	public BalanceGameDto getBalanceGameInfo(Long balanceGameIdx) {
		BalanceGame balanceGameEntity = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
			.orElseThrow(() -> new NoSuchElementException());

		return balanceGameEntity.convertToDto();
	}

}
