package com.ntt.mwonimoney.domain.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ntt.mwonimoney.domain.quiz.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	@Query(value = "SELECT * FROM quiz ORDER BY RAND() limit 5", nativeQuery = true)
	List<Quiz> findRandom5Quiz();
}
