package com.ntt.mwonimoney.domain.member.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.api.request.MemberInfoChangeRequest;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
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
	public MemberDto getMemberInfo(Long memberIdx) {
		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다"));

		return member.convertToDto();
	}

	@Override
	@Transactional
	public void editMember(MemberInfoChangeRequest request, Long memberIdx) {

		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다"));

		if (request.getMemberRole().isPresent())
			member.changeMemberRole(request.getMemberRole().get());

		if (request.getEmail().isPresent())
			member.changeMemberEmail(request.getEmail().get());

		if (request.getNickname().isPresent())
			member.changeMemberNickname(request.getNickname().get());

		if (request.getBirthday().isPresent())
			member.changeMemberBirthday(request.getBirthday().get());
	}
}
