package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ntt.mwonimoney.domain.member.entity.MemberAuth;

public interface MemberAuthRepository extends CrudRepository<MemberAuth, String> {

	Optional<MemberAuth> findMemberAuthByMemberUUID(String memberUUID);
}
