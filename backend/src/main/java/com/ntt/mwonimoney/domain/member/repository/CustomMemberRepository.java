package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;

public interface CustomMemberRepository {

	Optional<? extends Member> findMemberByIdx(Long memberIdx);

	Optional<? extends Member> findMemberByUuid(String memberUUID);

	Optional<? extends Member> findMemberBySocialId(String socialId);

	Optional<Member> changeAndSaveMemberRole(Long memberIdx, MemberRole memberRole);

	Long findMemberIdxByUuid(String memberUUID);
}

