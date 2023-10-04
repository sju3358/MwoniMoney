package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.account.service.NHApiService;
import com.ntt.mwonimoney.domain.account.service.SmallAccountService;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Qualifier("SmallAccountServiceV2")
@Transactional(readOnly = true)
public class SmallAccountServiceImplV2 implements SmallAccountService {

	private final FinAccountRepository finAccountRepository;
	private final NHApiService nhApiService;
	private final MemberRepository memberRepository;

	@Override
	@Transactional
	/**
	 * param : memberIdx (Long)
	 */
	public void closeSmallAccount(Long memberIdx) {

		FinAccount smallAccount = finAccountRepository
			.findFinAccountByMemberAndTypeAndStatus(
				memberIdx,
				FinAccountType.SMALL,
				FinAccountStatus.ACTIVATE)
			.orElseThrow(() -> new NoSuchElementException("짜금통이 없습니다"));

		smallAccount.changeStatus(FinAccountStatus.DEACTIVATE);
	}

	@Override
	@Transactional
	public void openSmallAccount(Long memberIdx, SmallAccount smallAccount) {

		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버 정보가 존재하지 않습니다"));

		checkSmallAccountExit(memberIdx);

		// NHApi 연동불가
		// NHApiRequestHeader openVirtualAccountHeader = NHApiRequestHeader.builder()
		// 	.ApiNm("OpenVirtualAccount")
		// 	.IsTuno(nhApiService.istunoGenerator())
		// 	.build();
		//
		// NHOpenVirtualAccountRequest openVirtualAccountRequest = NHOpenVirtualAccountRequest.builder()
		// 	.requestHeader(openVirtualAccountHeader)
		// 	.Dpnm(member.getName())
		// 	.build();
		//
		// NHOpenVirtualAccountResponse openVirtualAccountResponse = nhApiService.getOpenVirtualAccount(
		// 	openVirtualAccountRequest);

		FinAccount finAccount = FinAccount.builder()
			.number(member.getUuid())
			.finAcno(member.getUuid())
			.status(FinAccountStatus.ACTIVATE)
			.type(FinAccountType.SMALL)
			.member(member)
			.remain(0)
			.build();

		finAccountRepository.save(finAccount);

	}

	private void checkSmallAccountExit(Long memberIdx) {
		Optional<FinAccount> smallAccount = finAccountRepository
			.findFinAccountByMemberAndTypeAndStatus(memberIdx, FinAccountType.SMALL, FinAccountStatus.ACTIVATE);

		if (smallAccount.isEmpty() != true)
			throw new IllegalArgumentException("이미 짜금통이 존재합니다.");
	}
}
