package com.ntt.mwonimoney.domain.quiz.entity;

import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "quiz")
public class Quiz extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "quiz_idx")
	private Long id;

	@Column(name = "quiz_question")
	private String question;

	@Column(name = "quiz_option1")
	private String option1;

	@Column(name = "quiz_option2")
	private String option2;

	@Column(name = "quiz_option3")
	private String option3;

	@Column(name = "quiz_option4")
	private String option4;

	@Column(name = "quiz_answer")
	private int answer;

	public Quiz(Long id, String question, String option1, String option2, String option3, String option4,
		int answer) {
		this.id = id;
		this.question = question;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
		this.answer = answer;
	}

	@Builder

	public QuizDto convertToDto() {
		return QuizDto.builder()
			.id(this.id)
			.question(this.question)
			.option1(this.option1)
			.option2(this.option2)
			.option3(this.option3)
			.option4(this.option4)
			.answer(this.answer)
			.build();
	}

}
