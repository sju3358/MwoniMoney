package com.ntt.mwonimoney.domain.game.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameListRequest {

	private int page;
	private int size;
}
