package com.ntt.wannabee.domain.member.repository;

import java.util.Optional;

import com.ntt.wannabee.domain.member.entity.Member;

public interface MemberRepositoryCustom {
	Optional<Member> findMemberByUuid(String uuid);
}
