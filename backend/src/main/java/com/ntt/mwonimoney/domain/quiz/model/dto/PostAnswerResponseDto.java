package com.ntt.mwonimoney.domain.quiz.model.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostAnswerResponseDto {

    private String isAnswer;

    private Long memberIdx;

    private Long quizIdx;

}
