package com.ntt.mwonimoney.domain.quiz.repository;

import com.ntt.mwonimoney.domain.quiz.entity.QuizHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long>, CustomQuizHistoryRepository {
}
