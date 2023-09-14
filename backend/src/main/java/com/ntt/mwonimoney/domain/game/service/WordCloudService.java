package com.ntt.mwonimoney.domain.game.service;

import com.ntt.mwonimoney.domain.game.entity.Word;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface WordCloudService {

	Flux<Word> getWordCloudData(Long balanceGameIdx);

	Mono<Word> addWord(Word word, Long balanceGameIdx);
}
