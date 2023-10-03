package com.ntt.mwonimoney.domain.account.repository;

import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto;

public interface FinAccountTransactionRepositoryCustom {
	List<FinAccountTransactionDto> findFinAccountTransactionByFinAccountIdx(Long finAccountIdx);
}
