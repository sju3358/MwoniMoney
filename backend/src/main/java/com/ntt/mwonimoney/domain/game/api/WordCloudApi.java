package com.ntt.mwonimoney.domain.game.api;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.entity.Word;
import com.ntt.mwonimoney.domain.game.service.WordCloudService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WordCloudApi {

	private final WordCloudService wordCloudService;

	@GetMapping(value = "/balances/{balanceGameIdx}/word-cloud", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<List<Word>> getWordCouldDataRequest(@PathVariable Long balanceGameIdx) {
		return wordCloudService.getWordCloudData(balanceGameIdx);
	}

	@PostMapping("/balances/{balanceGameIdx}/word-cloud")
	public void postWordCloudDataRequest(
		@PathVariable Long balanceGameIdx,
		@RequestBody Chat chat) {

		wordCloudService.addWord(chat, balanceGameIdx);
	}
}
