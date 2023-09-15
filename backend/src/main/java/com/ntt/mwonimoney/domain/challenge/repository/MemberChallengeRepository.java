package com.ntt.mwonimoney.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {
}
