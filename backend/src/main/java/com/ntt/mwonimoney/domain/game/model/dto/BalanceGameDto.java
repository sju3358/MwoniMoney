package com.ntt.mwonimoney.domain.game.model.dto;

import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameDto {

	Long idx;

	String question;

	String leftAnswer;

	String rightAnswer;

	BalanceGameStatus balanceGameStatus;

	private int countOfLeftAnswer;

	private int countOfRightAnswer;
}
