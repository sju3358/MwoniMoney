package com.ntt.mwonimoney.domain.game.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.service.ChattingService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class ChattingApi {

	private final ChattingService chattingService;

	@GetMapping(value = "/balances/{balanceGameIdx}/chatting", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Chat> getChattingHistoryRequest(@PathVariable Long balanceGameIdx) {
		return chattingService.getBalanceGameChattingHistory(balanceGameIdx);
	}

	@PostMapping("/balances/{balanceGameIdx}/chatting")
	public Mono<Chat> postChatRequest(
		@CookieValue("memberUUID") String memberUUID,
		@PathVariable Long balanceGameIdx,
		@RequestBody Chat chat) {

		return chattingService.addChat(chat, memberUUID, balanceGameIdx);
	}
}
