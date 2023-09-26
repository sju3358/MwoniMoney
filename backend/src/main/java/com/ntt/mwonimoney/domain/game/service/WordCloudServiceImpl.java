package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.entity.Word;
import com.ntt.mwonimoney.domain.game.repository.ReactiveWordCloudRepository;
import com.ntt.mwonimoney.domain.game.repository.WordCloudRepository;

import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
@Slf4j
public class WordCloudServiceImpl implements WordCloudService {

	private final ReactiveWordCloudRepository reactiveWordCloudRepository;
	private final WordCloudRepository wordCloudRepository;
	private final Komoran komoran;

	@Override
	public Flux<List<Word>> getWordCloudData(Long balanceGameIdx) {
		return reactiveWordCloudRepository.findWordsByBalanceGameIdx(balanceGameIdx)
			.subscribeOn(Schedulers.boundedElastic());
	}

	@Override
	public void addWord(Chat chat, Long balanceGameIdx) {

		List<Token> tokens = komoran.analyze(chat.getMessage()).getTokenList();

		List<Word> words = new ArrayList<>();
		for (Token token : tokens) {
			String pos = token.getPos();
			if (pos.startsWith("NN")) {
				Word word = wordCloudRepository.findWordByWord(token.getMorph())
					.orElse(Word.builder()
						.word(token.getMorph())
						.count(0L)
						.balanceGameIdx(balanceGameIdx)
						.build());
				word.setCount(word.getCount() + 1);
				words.add(word);
			}
		}

		reactiveWordCloudRepository.saveAll(words);
	}
}
