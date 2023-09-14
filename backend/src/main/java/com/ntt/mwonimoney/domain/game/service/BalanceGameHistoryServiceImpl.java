package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistory;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.mwonimoney.domain.game.repository.BalanceGameHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BalanceGameHistoryServiceImpl {

	private final BalanceGameHistoryRepository balanceGameHistoryRepository;

	public List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx) {

		List<BalanceGameHistory> balanceGameHistoryEntities =
			balanceGameHistoryRepository.findBalanceGameHistoriesByBAndBalanceGameHistoryKey_MemberIdx(memberIdx)
				.orElseThrow(() -> new NoSuchElementException("벨런스 게임 참여 기록이 없습니다."));

		List<BalanceGameHistoryDto> balanceGameHistories = new ArrayList<>();
		for (BalanceGameHistory balanceGameHistoryEntity : balanceGameHistoryEntities) {
			balanceGameHistories.add(balanceGameHistoryEntity.convertToDto());
		}

		return balanceGameHistories;
	}
}
