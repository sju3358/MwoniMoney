package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.member.entity.Member;

public interface MemberRepositoryCustom {
	Optional<Member> findMemberByUuid(String uuid);
}
