package com.ntt.mwonimoney.domain.account.service.v1;

import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.repository.FinAccountTransactionRepository;
import com.ntt.mwonimoney.domain.account.service.FinAccountTransactionalService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Primary
public class FinAccountTransactionServiceImpl implements FinAccountTransactionalService {

	private final FinAccountTransactionRepository finAccountTransactionRepository;

	public Optional<FinAccountTransaction> getTransaction(Long finAccountTransactionId) {
		return finAccountTransactionRepository.findById(finAccountTransactionId);
	}

	public Slice<FinAccountTransaction> getTransactionList(Long finAccountIdx, Pageable pageable) {
		return finAccountTransactionRepository.findByFinAccountIdx(finAccountIdx, pageable);
	}

	public FinAccountTransaction makeTransaction(FinAccountTransaction finAccountTransaction) {
		return finAccountTransactionRepository.save(finAccountTransaction);
	}

	public void editMemo(FinAccountTransaction finAccountTransaction, String memo) {
		finAccountTransaction.changeMemo(memo);
	}

}
