package com.ntt.mwonimoney.domain.game.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameDto {

	Long idx;

	String question;

	String answer1;

	String answer2;

	char active;
}
