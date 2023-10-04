package com.ntt.mwonimoney.domain.account.repository;

import java.util.List;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto;
import com.ntt.mwonimoney.domain.account.model.dto.GetTransactionResponseDto;
import com.ntt.mwonimoney.domain.account.model.dtoV2.GetTransactionRequestDto;

public interface FinAccountTransactionRepositoryCustom {
	List<FinAccountTransactionDto> findFinAccountTransactionByFinAccountIdx(Long finAccountIdx);


	public List<FinAccountTransaction> getTransaction(Long memberIdx, GetTransactionRequestDto getTransactionRequestDto);
}
