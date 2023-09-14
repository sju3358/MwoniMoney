package com.ntt.mwonimoney.domain.game.service;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.game.entity.Chat;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface ChattingService {
	Flux<Chat> getBalanceGameChattingHistory(Long balanceGameIdx);

	Mono<Chat> addChat(Chat chat, String memberUUID, Long balanceGameIdx);
}
