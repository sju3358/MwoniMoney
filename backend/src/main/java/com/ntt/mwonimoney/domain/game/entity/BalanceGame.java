package com.ntt.mwonimoney.domain.game.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

	@Column(name = "balance_news")
	private String news;

	@Column(name = "balance_question")
	private String question;

	@Column(name = "balance_left_answer")
	private String leftAnswer;

	@Column(name = "balance_right_answer")
	private String rightAnswer;

	@Enumerated(EnumType.STRING)
	@Column(name = "balance_status")
	private BalanceGameStatus balanceGameStatus;

	@CreatedDate
	@Column(name = "create_time", updatable = false)
	private LocalDateTime createTime;

	public void endBalanceGame() {
		this.balanceGameStatus = BalanceGameStatus.END;
	}

	public void runBalanceGame() {
		this.balanceGameStatus = BalanceGameStatus.RUNNING;
	}

	@Builder
	public BalanceGame(String news, String question, String leftAnswer, String rightAnswer) {
		this.news = news;
		this.question = question;
		this.leftAnswer = leftAnswer;
		this.rightAnswer = rightAnswer;
		this.balanceGameStatus = BalanceGameStatus.WAIT;
	}

	public BalanceGameDto convertToDto() {
		return BalanceGameDto.builder()
			.idx(this.idx)
			.news(this.news)
			.question(this.question)
			.leftAnswer(this.leftAnswer)
			.rightAnswer(this.rightAnswer)
			.balanceGameStatus(this.balanceGameStatus)
			.build();
	}

}
