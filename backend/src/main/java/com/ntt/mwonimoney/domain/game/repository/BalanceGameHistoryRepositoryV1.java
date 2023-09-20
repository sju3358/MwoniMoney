package com.ntt.mwonimoney.domain.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistory;
import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistoryKey;

public interface BalanceGameHistoryRepositoryV1 extends JpaRepository<BalanceGameHistory, BalanceGameHistoryKey> {

	Optional<BalanceGameHistory> findBalanceGameHistoryByBalanceGameHistoryKey(
		BalanceGameHistoryKey balanceGameHistoryKey);

	Optional<List<BalanceGameHistory>> findBalanceGameHistoriesByBAndBalanceGameHistoryKey_MemberIdx(Long memberIdx);
}
