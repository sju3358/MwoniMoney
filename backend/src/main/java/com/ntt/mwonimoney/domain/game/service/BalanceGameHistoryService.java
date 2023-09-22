package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;

public interface BalanceGameHistoryService {
	List getUserBalanceGameHistories(Long memberIdx);

	void selectBalanceGameAnswer(Long balanceGameIdx, Long MemberIdx, BalanceGameAnswer selectAnswer);

}
