package com.ntt.mwonimoney.domain.game.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.entity.Word;
import com.ntt.mwonimoney.domain.game.model.dto.WordDto;
import com.ntt.mwonimoney.domain.game.repository.WordCloudRepository;

import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class WordCloudServiceImpl implements WordCloudService {

	private final WordCloudRepository wordCloudRepository;
	private final Komoran komoran;

	@Override
	public List<WordDto> getWordCloudData(Long balanceGameIdx) {
		List<Word> words = wordCloudRepository.findWordsByBalanceGameIdx(balanceGameIdx);

		List<WordDto> result = new ArrayList<>();
		for (Word word : words)
			result.add(WordDto.builder()
				.text(word.getWord())
				.value(word.getCount())
				.build());
		return result;
	}

	@Override
	@Transactional
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

		wordCloudRepository.saveAll(words);
	}
}
