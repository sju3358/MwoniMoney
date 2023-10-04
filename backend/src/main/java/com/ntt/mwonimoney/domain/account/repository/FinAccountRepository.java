package com.ntt.mwonimoney.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;

public interface FinAccountRepository extends JpaRepository<FinAccount, Long>, FinAccountRepositoryCustom {

}
