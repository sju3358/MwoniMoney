package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinAccountTransactionRepository extends JpaRepository<FinAccountTransaction, Long> {
}
