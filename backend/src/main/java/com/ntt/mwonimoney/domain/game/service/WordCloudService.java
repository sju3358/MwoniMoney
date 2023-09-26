package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.entity.Word;

import reactor.core.publisher.Flux;

public interface WordCloudService {

	Flux<List<Word>> getWordCloudData(Long balanceGameIdx);

	void addWord(Chat chat, Long balanceGameIdx);
}
