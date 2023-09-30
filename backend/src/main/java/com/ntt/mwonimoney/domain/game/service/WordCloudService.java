package com.ntt.mwonimoney.domain.game.service;

import java.util.List;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.model.dto.WordDto;

public interface WordCloudService {

	List<WordDto> getWordCloudData(Long balanceGameIdx);

	void addWord(Chat chat, Long balanceGameIdx);
}
