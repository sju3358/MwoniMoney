package com.ntt.mwonimoney.domain.account.service;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;

public interface FinAccountTransactionalService {

	public Slice<FinAccountTransaction> getTransactionList(Long finAccountIdx, Pageable pageable);

	public Optional<FinAccountTransaction> getTransaction(Long finAccountTransactionId);

	public FinAccountTransaction makeTransaction(FinAccountTransaction finAccountTransaction);

	public void editMemo(FinAccountTransaction finAccountTransaction, String memo);
}
