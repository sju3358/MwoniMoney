package com.ntt.mwonimoney.domain.game.api.request;

import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceGameAnswerRequest {

	private BalanceGameAnswer selectAnswer;
}
