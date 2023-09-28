package com.ntt.mwonimoney.domain.member.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.entity.MemberAuth;
import com.ntt.mwonimoney.domain.member.model.dto.MemberAuthDto;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberAuthServiceImpl implements MemberAuthService {

	private final MemberAuthRepository memberAuthRepository;

	@Override
	public MemberAuthDto getMemberAuthInfo(String memberUUID) {
		MemberAuth memberAuth = memberAuthRepository.findById(memberUUID)
			.orElseThrow(() -> new NoSuchElementException());
		return memberAuth.convertToDto();
	}

	@Override
	@Transactional
	public void login(MemberAuthDto memberAuthDto) {
		MemberAuth memberAuth = MemberAuth.builder()
			.memberUUID(memberAuthDto.getMemberUUID())
			.memberIdx(memberAuthDto.getMemberIdx())
			.memberRefreshToken(memberAuthDto.getMemberRefreshToken())
			.build();

		memberAuthRepository.save(memberAuth);
	}

	@Override
	@Transactional
	public void logout(String memberUUID) {
		MemberAuth memberAuth = memberAuthRepository.findMemberAuthByMemberUUID(memberUUID)
			.orElseThrow(() -> new NoSuchElementException());
		memberAuthRepository.delete(memberAuth);
	}
}
