package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.member.entity.Member;

public interface CustomMemberRepository {

	Optional<? extends Member> findMemberByIdx(Long memberIdx);

	Optional<? extends Member> findMemberByUuid(String memberUUID);

	Optional<? extends Member> findMemberBySocialId(String socialId);

}
