package com.ntt.mwonimoney.domain.quiz.model.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class QuizDto {

	private Long id;

	private String question;

	private String option1;

	private String option2;

	private String option3;

	private String option4;

	private String answer;

}
