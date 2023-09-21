package com.ntt.mwonimoney.domain.game.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameHistoryDto {

	private Long balanceGameIdx;

	private Long memberIdx;

	private int selectAnswer;


}
