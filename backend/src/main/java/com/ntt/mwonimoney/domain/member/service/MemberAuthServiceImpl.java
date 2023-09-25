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
		MemberAuth memberAuth = memberAuthRepository.findMemberAuthByMemberUUID(memberUUID)
			.orElseThrow(() -> new NoSuchElementException());
		return memberAuth.convertToDto();
	}

	@Override
	@Transactional
	public void Login(MemberAuthDto memberAuthDto) {
		MemberAuth memberAuth = new MemberAuth(memberAuthDto.getMemberUUID(), memberAuthDto.getMemberIdx(),
			memberAuthDto.getMemberRefreshToken());
		memberAuthRepository.save(memberAuth);
	}

	@Override
	@Transactional
	public void Logout(String memberUUID) {
		MemberAuth memberAuth = memberAuthRepository.findMemberAuthByMemberUUID(memberUUID)
			.orElseThrow(() -> new NoSuchElementException());
		memberAuthRepository.delete(memberAuth);
	}
}
