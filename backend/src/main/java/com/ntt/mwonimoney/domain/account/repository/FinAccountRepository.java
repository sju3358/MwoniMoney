package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinAccountRepository extends JpaRepository<FinAccount, Long>, FinAccountRepositoryCustom {

}
