package com.ntt.mwonimoney.domain.game.service;

import com.ntt.mwonimoney.domain.game.entity.Word;
import com.ntt.mwonimoney.domain.game.repository.WordCloudRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
@Slf4j
public class WordCloudServiceImpl implements WordCloudService {

	private final WordCloudRepository wordCloudRepository;

	public Flux<Word> getWordCloudData(Long balanceGameIdx) {
		return wordCloudRepository.mFindByBalanceGameIdx(balanceGameIdx)
			.subscribeOn(Schedulers.boundedElastic());
	}

	public Mono<Word> addWord(Word word, Long balanceGameIdx) {

		word.setBalanceGameIdx(balanceGameIdx);

		return wordCloudRepository.save(word);
	}
}
