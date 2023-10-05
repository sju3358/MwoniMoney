package com.ntt.mwonimoney.domain.quiz.service;

import java.util.List;

import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerRequestDto;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerResponseDto;
import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;

public interface QuizService {
	List<QuizDto> getRandom5QuizSet();

	PostAnswerResponseDto postAnswer(Long memberIdx, PostAnswerRequestDto postAnswerRequestDto);
}
