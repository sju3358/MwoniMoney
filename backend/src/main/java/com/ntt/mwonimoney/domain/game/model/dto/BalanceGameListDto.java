package com.ntt.mwonimoney.domain.game.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameListDto {

	private Long idx;
	private String question;
	private String status;

}
