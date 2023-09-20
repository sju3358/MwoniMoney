package com.ntt.mwonimoney.domain.game.service;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.repository.ChattingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChattingServiceImpl implements ChattingService {

    private final ChattingRepository chattingRepository;

    @Override
    public Flux<Chat> getBalanceGameChattingHistory(Long balanceGameIdx) {
        return chattingRepository.mFindByBalanceGameIdx(balanceGameIdx)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Chat> addChat(Chat chat, String memberUUID, Long balanceGameIdx) {

        chat.setSenderUUID(memberUUID);
        chat.setBalanceGameIdx(balanceGameIdx);
        chat.setCreatedTime(LocalDateTime.now());

        return chattingRepository.save(chat);
    }

}
