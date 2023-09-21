package com.ntt.mwonimoney.domain.game.model.dto;

import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameDto {

	Long idx;

	String question;

	String answer1;

	String answer2;

	BalanceGameStatus status;

	private int countOfAnswer1;

	private int countOfAnswer2;
}
