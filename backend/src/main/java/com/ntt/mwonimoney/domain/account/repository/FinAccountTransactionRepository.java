package com.ntt.mwonimoney.domain.account.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;

import jakarta.transaction.Transactional;

@Transactional
public interface FinAccountTransactionRepository
	extends JpaRepository<FinAccountTransaction, Long>, FinAccountTransactionRepositoryCustom {

	Slice<FinAccountTransaction> findByFinAccountIdx(Long finAccountIdx, Pageable pageable);

	Slice<FinAccountTransaction> findByFinAccountIdxAndMoneyGreaterThanEqual(Long finAccountIdx, int money,
		Pageable pageable);

	Slice<FinAccountTransaction> findByFinAccountIdxAndMoneyLessThanEqual(Long finAccountIdx, int money,
		Pageable pageable);
}
