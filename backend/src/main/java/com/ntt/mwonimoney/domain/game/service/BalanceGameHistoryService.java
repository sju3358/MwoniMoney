package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;

@Service
public interface BalanceGameHistoryService {
	List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx);
}
