package com.ntt.wannabee.domain.game.service;

import org.springframework.stereotype.Service;

import com.ntt.wannabee.domain.game.repository.BalanceGameHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BalanceGameHistoryService {

	private final BalanceGameHistoryRepository balanceGameHistoryRepository;
}
