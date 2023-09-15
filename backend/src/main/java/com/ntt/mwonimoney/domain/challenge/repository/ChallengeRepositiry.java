package com.ntt.mwonimoney.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ntt.mwonimoney.domain.challenge.entity.Challenge;

public interface ChallengeRepositiry extends JpaRepository<Challenge, Integer> {
	// client에서 title과 category를 받아와서 해당 challenge를 return
	@Query("select c from Challenge c where c.title = :title and c.category = :category")
	Challenge findChallenge(@Param("title") String title, @Param("category") String category);
}