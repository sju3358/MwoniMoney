package com.ntt.mwonimoney.domain.account.repository;

import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto2;

public interface FinAccountTransactionRepositoryCustom {
	List<FinAccountTransactionDto2> findFinAccountTransactionByFinAccountIdx(Long finAccountIdx);
}
