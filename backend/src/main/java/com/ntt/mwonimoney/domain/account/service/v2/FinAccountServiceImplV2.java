package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.List;
import java.util.Optional;

import com.ntt.mwonimoney.domain.account.model.dtoV2.FinAccountV2Dto;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.service.FinAccountService;

import lombok.RequiredArgsConstructor;

@Service(value = "FinAccountServiceV2")
@RequiredArgsConstructor
public class FinAccountServiceImplV2{

	private final FinAccountRepository finAccountRepository;
	private final MemberRepository memberRepository;
	private final MemberAuthRepository memberAuthRepository;
	public FinAccountV2Dto getFinAccountByUUID(String memberUUID, String type) {
		Long memberIdx = memberAuthRepository.findById(memberUUID).orElseThrow().getMemberIdx();
		FinAccountType finAccountType = FinAccountType.valueOf(type);

		FinAccount finAccount = finAccountRepository.getFinAccountByUUID(memberIdx, finAccountType);

		// builder 패턴을 사용하여 FinAccountV2Dto 객체 생성
		FinAccountV2Dto finAccountV2Dto = FinAccountV2Dto.builder()
				.idx(finAccount.getIdx())
				.number(finAccount.getNumber())
				.finAcno(finAccount.getFinAcno())
				.status(finAccount.getStatus())
				.type(finAccount.getType())
				.remain(finAccount.getRemain())
				.build();

		return finAccountV2Dto;
	}
}
