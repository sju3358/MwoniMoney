package com.ntt.wannabee.domain.game.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ntt.wannabee.domain.game.entity.Chat;
import com.ntt.wannabee.domain.game.repository.ChattingRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class ChattingService {

	private final ChattingRepository chattingRepository;

	public Flux<Chat> getBalanceGameChattingHistory(Long balanceGameIdx) {
		return chattingRepository.mFindByBalanceGameIdx(balanceGameIdx)
			.subscribeOn(Schedulers.boundedElastic());
	}

	public Mono<Chat> addChat(Chat chat, String memberUUID, Long balanceGameIdx) {

		chat.setSenderUUID(memberUUID);
		chat.setBalanceGameIdx(balanceGameIdx);
		chat.setCreatedTime(LocalDateTime.now());

		return chattingRepository.save(chat);
	}

}
