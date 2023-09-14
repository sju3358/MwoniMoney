package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;

public interface BalanceGameHistoryService {
	List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx);
}
