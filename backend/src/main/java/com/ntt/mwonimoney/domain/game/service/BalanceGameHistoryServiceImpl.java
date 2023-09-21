package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistory;
import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistoryKey;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BalanceGameHistoryServiceImpl implements BalanceGameHistoryService {

	private final BalanceGameHistoryRepository balanceGameHistoryRepository;
	private final BalanceGameRepository balanceGameRepository;
	private final MemberRepository memberRepository;

	@Override
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

	@Override
	@Transactional
	public void selectBalanceGameAnswer(Long balanceGameIdx, Long memberIdx, byte selectAnswer) {

		try {

			BalanceGameHistoryKey key = new BalanceGameHistoryKey(balanceGameIdx, memberIdx);
			BalanceGameHistory balanceGameHistory =
				balanceGameHistoryRepository.findBalanceGameHistoryByBalanceGameHistoryKey(key)
					.orElseThrow(() -> new NoSuchElementException());

			balanceGameHistory.changeSelect(selectAnswer);

		} catch (NoSuchElementException e) {

			BalanceGame balanceGame = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
				.orElseThrow(() -> new NoSuchElementException("밸런스게임이 존재하지 않습니다."));

			Member member = memberRepository.findMemberByIdx(memberIdx)
				.orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));

			BalanceGameHistory balanceGameHistory = BalanceGameHistory.builder()
				.balanceGame(balanceGame)
				.member(member)
				.selectAnswer(selectAnswer)
				.build();

			balanceGameHistoryRepository.save(balanceGameHistory);
		}
	}
}
