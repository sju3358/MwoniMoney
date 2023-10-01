package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHOpenVirtualAccountResponse;
import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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

    public Optional<FinAccount> getFinAccountByMemberAndType(Long memberIdx, FinAccountType finAccountType){
        return finAccountRepository.findFinAccountByMemberAndType(memberIdx, finAccountType);
    }

    public FinAccount saveFinAccount(NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponse) {
        return null;
    }

    public FinAccount saveSmallAccount(NHOpenVirtualAccountResponse openVirtualAccountResponse) {
        return null;
    }

    public FinAccount closeSmallAccount() {
        return null;
    }
}
