package com.ntt.mwonimoney.domain.challenge.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {
	//status랑 memberidx로 조회하기
	@Query("select c from MemberChallenge c where c.status = :status and c.member.idx = :memberIdx order by c.endTime asc")
	List<MemberChallenge> findbyStatusandIdx(@Param("status") Integer status, @Param("memberIdx") Long memberIdx);

	//memberidx로 조회하기
	@Query("select c from MemberChallenge c where c.member.idx = :memberIdx order by c.status asc,c.endTime asc")
	List<MemberChallenge> findMemberChallengeMemberIdx(@Param("memberIdx") Long memberIdx);

	//스케줄러에서 이용
	List<MemberChallenge> findByEndTimeBeforeAndStatus(LocalDateTime localDateTime, Integer status);
}
