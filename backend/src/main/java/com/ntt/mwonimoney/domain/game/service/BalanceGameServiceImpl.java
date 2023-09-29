package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.api.request.BalanceGameListRequest;
import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameListDto;
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
	public Slice<BalanceGameListDto> getBalanceGames(BalanceGameListRequest request) {

		Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

		Slice<BalanceGame> balanceGameEntities = balanceGameRepository.findSliceGamesBy(pageable);

		if (balanceGameEntities.isEmpty() == true) {
			throw new NoSuchElementException("밸런스 게임이 존재하지 않습니다.");
		}

		List<BalanceGameListDto> balanceGameList = new ArrayList<>();

		for (BalanceGame balanceGameEntity : balanceGameEntities) {
			balanceGameList.add(
				BalanceGameListDto.builder()
					.idx(balanceGameEntity.getIdx())
					.question(balanceGameEntity.getQuestion())
					.build());
		}

		return new SliceImpl<>(balanceGameList, balanceGameEntities.getPageable(), balanceGameEntities.hasNext());
	}

	public BalanceGameDto getTodayBalanceGame() {

		return balanceGameRepository.findTodayBalanceGameDto()
			.orElseThrow(() -> new NoSuchElementException("오늘의 밸런스게임이 존재하지 않습니다."));
	}

	public BalanceGameDto getBalanceGameInfo(Long balanceGameIdx) {

		return balanceGameRepository.findBalanceGameDtoByIdx(balanceGameIdx)
			.orElseThrow(() -> new NoSuchElementException("해당 idx의 밸런스게임이 존재하지 않습니다."));
	}

}
