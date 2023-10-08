package com.ntt.mwonimoney.domain.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;

public interface MemberRepository extends JpaRepository<Member, Long>, CustomMemberRepository {
	List<Member> findAllByMemberRole(MemberRole memberRole);
}
