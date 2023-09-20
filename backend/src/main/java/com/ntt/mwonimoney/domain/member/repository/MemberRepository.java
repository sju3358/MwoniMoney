package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByIdx(Long memberIdx);

	Optional<Member> findMemberBySocialId(String socialId);
}
