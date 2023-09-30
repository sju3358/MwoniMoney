package com.ntt.mwonimoney.domain.quiz.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GradeAnswerRequest {

	private Long quizIndex;

	private int selectAnswer;
}
