package com.ntt.mwonimoney.domain.quiz.service;

import java.util.List;

import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;

public interface QuizService {
	List<QuizDto> getRandom5QuizSet();
}
