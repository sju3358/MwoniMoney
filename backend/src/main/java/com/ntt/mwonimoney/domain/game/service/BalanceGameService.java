package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
public class BalanceGameService {

	private final BalanceGameRepository balanceGameRepository;

	public List<BalanceGameDto> getBalanceGames() {
		List<BalanceGame> balanceGameEntityList = balanceGameRepository.findAll();

		if (balanceGameEntityList.isEmpty() == true) {
			throw new NoSuchElementException();
		}

		List<BalanceGameDto> balanceGames = new ArrayList<>();

		for (BalanceGame balanceGameEntity : balanceGameEntityList) {
			balanceGames.add(balanceGameEntity.convertToDto());
		}

		return balanceGames;
	}

	// public BalanceGameDto getTodayBalanceGame() {
	//
	// }

	public BalanceGameDto getBalanceGameInfo(Long balanceGameIdx) {
		BalanceGame balanceGameEntity = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
			.orElseThrow(() -> new NoSuchElementException());

		return balanceGameEntity.convertToDto();
	}

	@Transactional
	public void addBalanceGame(BalanceGameDto balanceGameDto) {
		BalanceGame balanceGame = BalanceGame.builder()
			.question(balanceGameDto.getQuestion())
			.answer1(balanceGameDto.getAnswer1())
			.answer2(balanceGameDto.getAnswer2())
			.build();

		balanceGameRepository.save(balanceGame);
	}

	@Transactional
	public void editBalanceGame(BalanceGameDto balanceGameDto) {
		BalanceGame balanceGameEntity = balanceGameRepository.findBalanceGameByIdx(balanceGameDto.getIdx())
			.orElseThrow(() -> new NoSuchElementException());

		balanceGameEntity.updateBalanceGame(balanceGameDto.getQuestion(), balanceGameDto.getAnswer1(),
			balanceGameDto.getAnswer2());
	}

	@Transactional
	public void closeBalanceGame(Long balanceGameIdx) {
		BalanceGame balanceGameEntity = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
			.orElseThrow(() -> new NoSuchElementException());

		balanceGameEntity.deactivate();
	}

	@Transactional
	public void removeBalanceGame(Long balanceGameIdx) {
		BalanceGame balanceGameEntity = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
			.orElseThrow(() -> new NoSuchElementException());

		balanceGameRepository.delete(balanceGameEntity);
	}

}
