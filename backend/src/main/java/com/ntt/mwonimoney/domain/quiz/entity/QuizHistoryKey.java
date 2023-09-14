package com.ntt.mwonimoney.domain.quiz.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizHistoryKey implements Serializable {

	@Column(name = "quiz_idx")
	private Long quizIdx;

	@Column(name = "member_idx")
	private Long memberIdx;
}
