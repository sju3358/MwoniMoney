package com.ntt.wannabee.domain.member.repository;

import java.util.Optional;

import com.ntt.wannabee.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryCustomImpl {
	
	private final Optional<Member> findMemberByUuid(String uuid) {

	}
}
