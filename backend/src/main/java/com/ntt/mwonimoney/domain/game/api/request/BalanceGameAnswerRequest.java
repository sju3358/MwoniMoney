package com.ntt.mwonimoney.domain.game.api.request;

import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BalanceGameAnswerRequest {

	private BalanceGameAnswer selectAnswer;
}
