package com.ntt.mwonimoney.domain.quiz.repository;

import com.ntt.mwonimoney.domain.quiz.entity.QuizHistory;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerRequestDto;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerResponseDto;

public interface CustomQuizHistoryRepository {

    public QuizHistory postAnswer(Long memberIdx, PostAnswerRequestDto postAnswerRequestDto);
}
