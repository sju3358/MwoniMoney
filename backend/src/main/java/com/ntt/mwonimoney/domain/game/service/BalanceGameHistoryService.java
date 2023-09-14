package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;

@Service
@Transactional(readOnly = true)
public interface BalanceGameHistoryService {
	List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx);
}
