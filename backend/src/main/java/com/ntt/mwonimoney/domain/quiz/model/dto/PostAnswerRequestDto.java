package com.ntt.mwonimoney.domain.quiz.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostAnswerRequestDto {

    private Long quizIdx;

    private int answer;

}
