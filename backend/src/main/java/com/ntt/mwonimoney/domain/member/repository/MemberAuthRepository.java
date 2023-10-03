package com.ntt.mwonimoney.domain.member.repository;

import org.springframework.data.repository.CrudRepository;

import com.ntt.mwonimoney.domain.member.entity.MemberAuth;

public interface MemberAuthRepository extends CrudRepository<MemberAuth, String> {
}
