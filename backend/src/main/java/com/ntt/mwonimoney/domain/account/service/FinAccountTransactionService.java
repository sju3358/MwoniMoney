package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.repository.FinAccountTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FinAccountTransactionService {

    private final FinAccountTransactionRepository finAccountTransactionRepository;

    public Optional<FinAccountTransaction> findById(Long finAccountTransactionId){
        return finAccountTransactionRepository.findById(finAccountTransactionId);
    }

    public FinAccountTransaction save(FinAccountTransaction finAccountTransaction) {
        return finAccountTransactionRepository.save(finAccountTransaction);
    }

    public Slice<FinAccountTransaction> findByFinAccount(Long finAccountIdx, Pageable pageable){
        return finAccountTransactionRepository.findByFinAccountIdx(finAccountIdx, pageable);
    }

    public List<FinAccountTransaction> findByFinAccountIdxAndMoneyGreaterThanEqual(Long finAccountIdx, int price, Pageable pageable){
        return null;
//        return finAccountTransactionRepository.findByFinAccountIdxAndMoneyGreaterThanEqual(finAccountIdx, price, pageable);
    }

    public void changeMemo(FinAccountTransaction finAccountTransaction, String memo){
        finAccountTransaction.changeMemo(memo);
    }


}
