package com.ntt.mwonimoney.domain.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistory;
import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistoryKey;

import io.lettuce.core.dynamic.annotation.Param;

public interface BalanceGameHistoryRepository extends JpaRepository<BalanceGameHistory, BalanceGameHistoryKey> {

	//fetch join
	Optional<BalanceGameHistory> findBalanceGameHistoryByBalanceGameHistoryKey(BalanceGameHistoryKey balanceGameHistoryKey);

	@Query("select h from BalanceGameHistory h where h.balanceGameHistoryKey.memberIdx = :memberIdx")
	List<BalanceGameHistory> findHistoryByMemberIdx(@Param("memberIdx") Long memberIdx);


}
