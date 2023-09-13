package com.ntt.wannabee.domain.quiz.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizHistoryDto {

	private Long quizIdx;

	private String memberUUID;

	private byte selectAnswer;
}
