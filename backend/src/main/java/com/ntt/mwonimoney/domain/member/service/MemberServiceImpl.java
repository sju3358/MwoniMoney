package com.ntt.mwonimoney.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	@Override
	public void changeNickname(String newNickName) {

	}

	@Override
	public void addSmallAccount(SmallAccount smallAccount) {

	}

	@Override
	public void finishSmallAccount(String uuid) {

	}

	@Override
	public void getMemberInfo(String uuid) {

	}

	@Override
	public void addMemberInfo(MemberDto memberDto, int role, String memberUuid) {
		if (role == 1) { // 부모
			Member member = memberRepository.findMemberByUuid(memberUuid).orElseThrow();
			
		} else { // 자녀

		}
	}
}
