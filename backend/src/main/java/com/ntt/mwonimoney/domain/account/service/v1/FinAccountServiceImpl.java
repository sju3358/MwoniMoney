package com.ntt.mwonimoney.domain.account.service.v1;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.account.service.FinAccountService;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
@Primary
public class FinAccountServiceImpl implements FinAccountService {

	private final FinAccountRepository finAccountRepository;
	private final MemberRepository memberRepository;

	public List<FinAccount> getFinAccountList() {
		return finAccountRepository.findAll();
	}

	public Optional<FinAccount> getFinAccount(Long finAccountIdx) {
		return finAccountRepository.findById(finAccountIdx);
	}

	public Optional<FinAccount> getFinAccount(Long memberIdx, FinAccountType finAccountType,
		FinAccountStatus finAccountStatus) {
		return finAccountRepository.findFinAccountByMemberAndTypeAndStatus(memberIdx, finAccountType, finAccountStatus);
	}

	public FinAccount openFinAccount(FinAccount finAccount) {
		return finAccountRepository.save(finAccount);
	}

	public FinAccount openFinAccount(FinAccount newFinAccount, Long memberIdx) {
		Member member = memberRepository.findById(memberIdx).orElseThrow();
		newFinAccount.addMember(member);
		return finAccountRepository.save(newFinAccount);
	}

	public Long getBalance(Long finAccountIdx) {
		FinAccount finAccount = finAccountRepository.findById(finAccountIdx).orElseThrow();
		return finAccount.getRemain();
	}

}
