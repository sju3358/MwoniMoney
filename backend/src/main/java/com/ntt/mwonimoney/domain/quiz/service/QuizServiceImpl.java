package com.ntt.mwonimoney.domain.quiz.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.quiz.entity.Quiz;
import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;
import com.ntt.mwonimoney.domain.quiz.repository.QuizRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

	private final QuizRepository quizRepository;

	public List<QuizDto> getRandom5QuizSet() {

		List<Quiz> quizListEntity = quizRepository.findRandom5Quiz();

		List<QuizDto> quizDtoList = new ArrayList<>();
		for (Quiz quizEntity : quizListEntity) {
			quizDtoList.add(quizEntity.convertToDto());
		}

		return quizDtoList;
	}
}
