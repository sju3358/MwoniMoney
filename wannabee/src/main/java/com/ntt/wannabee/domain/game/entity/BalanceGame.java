package com.ntt.wannabee.domain.game.entity;

import com.ntt.wannabee.domain.game.model.dto.BalanceGameDto;

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
@Table(name = "balance")
public class BalanceGame {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idx;

	@Column(name = "balance_question")
	private String question;

	@Column(name = "balance_answer1")
	private String answer1;

	@Column(name = "balance_answer2")
	private String answer2;

	@Builder
	public BalanceGame(String question, String answer1, String answer2) {
		this.question = question;
		this.answer1 = answer1;
		this.answer2 = answer2;
	}

	public BalanceGameDto convertToDto() {
		return BalanceGameDto.builder()
			.idx(this.idx)
			.question(this.question)
			.answer1(this.answer1)
			.answer2(this.answer2)
			.build();
	}

}
