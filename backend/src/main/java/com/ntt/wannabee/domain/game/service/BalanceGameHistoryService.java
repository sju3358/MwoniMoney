package com.ntt.wannabee.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.ntt.wannabee.domain.game.entity.BalanceGameHistory;
import com.ntt.wannabee.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.wannabee.domain.game.repository.BalanceGameHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BalanceGameHistoryService {

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
