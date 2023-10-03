package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHOpenVirtualAccountResponse;
import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FinAccountService {

    private final FinAccountRepository finAccountRepository;
    private final MemberRepository memberRepository;

    public List<FinAccount> getFinAccountAll(){
        return finAccountRepository.findAll();
    }

    public Optional<FinAccount> getFinAccountByIdx(Long finAccountIdx){
        return finAccountRepository.findById(finAccountIdx);
    }

    public FinAccount save(FinAccount finAccount) {
        return finAccountRepository.save(finAccount);
    }

    public Optional<FinAccount> getFinAccountByMemberAndTypeAndStatus(Long memberIdx, FinAccountType finAccountType, FinAccountStatus finAccountStatus){
        return finAccountRepository.findFinAccountByMemberAndTypeAndStatus(memberIdx, finAccountType, finAccountStatus);
    }

    public void closeSmallAccount(Long smallAccountIdx) {

        FinAccount smallAccountToUpdate = finAccountRepository.findById(smallAccountIdx).orElseThrow();
        smallAccountToUpdate.changeStatus(FinAccountStatus.DEACTIVATE);

    }

    public Long getRemain(Long finAccountIdx){
        FinAccount finAccount = finAccountRepository.findById(finAccountIdx).orElseThrow();
        return finAccount.getRemain();
    }

    public FinAccount save(FinAccount newFinAccount, Long memberIdx) {
        Member member = memberRepository.findById(memberIdx).orElseThrow();
        newFinAccount.addMember(member);
        return finAccountRepository.save(newFinAccount);
    }
}
