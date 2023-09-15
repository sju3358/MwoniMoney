package com.ntt.mwonimoney.domain.game.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameAnswerResponse {

	private byte selectAnswer;
}
