package com.ntt.mwonimoney.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

}
