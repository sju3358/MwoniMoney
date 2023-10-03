package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface FinAccountTransactionRepository extends JpaRepository<FinAccountTransaction, Long> {

    Slice<FinAccountTransaction> findByFinAccountIdx(Long finAccountIdx, Pageable pageable);

    Slice<FinAccountTransaction> findByFinAccountIdxAndMoneyGreaterThanEqual(Long finAccountIdx, int money, Pageable pageable);

    Slice<FinAccountTransaction> findByFinAccountIdxAndMoneyLessThanEqual(Long finAccountIdx, int money, Pageable pageable);

}
