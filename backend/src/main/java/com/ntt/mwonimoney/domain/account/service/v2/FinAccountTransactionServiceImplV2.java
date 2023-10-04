package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.service.FinAccountTransactionalService;

import lombok.RequiredArgsConstructor;

@Service(value = "FinAccountTransactionServiceV2")
@RequiredArgsConstructor
public class FinAccountTransactionServiceImplV2 implements FinAccountTransactionalService {
	@Override
	public Slice<FinAccountTransaction> getTransactionList(Long finAccountIdx, Pageable pageable) {
		return null;
	}

	@Override
	public Optional<FinAccountTransaction> getTransaction(Long finAccountTransactionId) {
		return Optional.empty();
	}

	@Override
	public FinAccountTransaction makeTransaction(FinAccountTransaction finAccountTransaction) {
		return null;
	}

	@Override
	public void editMemo(FinAccountTransaction finAccountTransaction, String memo) {

	}
}
