package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FinAccountService {

    private final FinAccountRepository finAccountRepository;

    public List<FinAccount> getFinAccountAll(){
        return finAccountRepository.findAll();
    }

    public Optional<FinAccount> getFinAccountByIdx(Long finAccountIdx){
        return finAccountRepository.findById(finAccountIdx);
    }

    public FinAccount saveFinAccount(FinAccount finAccount) {
        return finAccountRepository.save(finAccount);
    }

    public List<FinAccount> getFinAccountByMember(Long memberIdx){
        return finAccountRepository.findByMember(memberIdx);
    }

}
