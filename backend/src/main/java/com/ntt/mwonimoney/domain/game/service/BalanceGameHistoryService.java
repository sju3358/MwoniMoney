package com.ntt.mwonimoney.domain.game.service;

import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;

import java.util.List;

public interface BalanceGameHistoryService {
    List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx);

    void selectBalanceGame(Long memberIdx, byte selectAnswer);
}
