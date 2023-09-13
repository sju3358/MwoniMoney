package com.ntt.wannabee.domain.quiz.entity;

import com.ntt.wannabee.domain.member.entity.Member;
import com.ntt.wannabee.domain.quiz.model.dto.QuizHistoryDto;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "quiz_member")
public class QuizHistory {

	@EmbeddedId
	private QuizHistoryKey quizHistoryKey;

	@Column(name = "quiz_select_answer")
	private byte selectAnswer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quiz_idx")
	private Quiz quiz;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_uuid")
	private Member member;

	@Builder
	public QuizHistory(QuizHistoryKey quizHistoryKey, byte selectAnswer, Quiz quiz, Member member) {
		this.quizHistoryKey = quizHistoryKey;
		this.selectAnswer = selectAnswer;
		this.quiz = quiz;
		this.member = member;
	}

	public QuizHistoryDto convertToDto() {
		return QuizHistoryDto.builder()
			.quizIdx(this.quizHistoryKey.getQuizIdx())
			.memberUUID(this.quizHistoryKey.getMemberUUID())
			.selectAnswer(this.selectAnswer)
			.build();
	}
}
