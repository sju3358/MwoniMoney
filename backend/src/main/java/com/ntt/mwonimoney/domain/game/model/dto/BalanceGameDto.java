package com.ntt.mwonimoney.domain.game.model.dto;

import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BalanceGameDto {

	private Long idx;

	private String news;
	
	private String question;

	private String leftAnswer;

	private String rightAnswer;

	private BalanceGameStatus balanceGameStatus;

	private int countOfLeftAnswer;

	private int countOfRightAnswer;
}
