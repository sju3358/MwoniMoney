package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Qualifier("FinAccountServiceV2")
@Transactional(readOnly = true)
public class FinAccountServiceImplV2 {

	private final FinAccountRepository finAccountRepository;
	private final MemberRepository memberRepository;

	public FinAccountDto getFinAccount(Long memberIdx, FinAccountType finAccountType) {
		return finAccountRepository.findFinAccountDtoByMemberIdxAndType(memberIdx, finAccountType)
			.orElseThrow(() -> new NoSuchElementException("핀어카운트 정보가 존재하지 않습니다"));
	}

	public FinAccountDto getFinAccount(String memberUUID, FinAccountType finAccountType) {
		Member member = memberRepository.findMemberByUuid(memberUUID)
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다."));

		return finAccountRepository.findFinAccountDtoByMemberIdxAndType(member.getIdx(), finAccountType)
			.orElseThrow(() -> new NoSuchElementException("핀어카운트 정보가 존재하지 않습니다"));
	}

	@Transactional
	public void openGeneralFinAccount(Long memberIdx, String accountNumber) {
		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버가 존재하지 않습니다."));

		/*
			NHN API 연동 코드 추가 예정
		 */

		if (finAccountRepository.findFinAccountDtoByMemberIdxAndType(memberIdx, FinAccountType.GENERAL).isPresent())
			throw new IllegalArgumentException("계좌는 1개만 생성 가능합니다.");

		FinAccount finAccount = FinAccount.builder()
			.number(accountNumber)
			.finAcno(UUID.randomUUID().toString())
			.status(FinAccountStatus.ACTIVATE)
			.type(FinAccountType.GENERAL)
			.remain(0L)
			.member(member)
			.build();

		finAccountRepository.save(finAccount);
	}

	@Transactional
	public void closeFinAccount(Long memberIdx) {

		FinAccount finAccount = finAccountRepository
			.findFinAccountByMemberIdxAndType(memberIdx, FinAccountType.GENERAL)
			.orElseThrow(() -> new NoSuchElementException("핀어카운트 정보가 존재하지 않습니다."));

		/*
			NH API 연동 코드 추가 예정
		 */

		finAccount.changeStatus(FinAccountStatus.DEACTIVATE);
	}

}
