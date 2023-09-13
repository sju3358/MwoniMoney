package com.ntt.wannabee.domain.game.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameHistoryDto {

	private Long balanceGameIdx;

	private String memberUUID;

	private byte selectAnswer;
}
