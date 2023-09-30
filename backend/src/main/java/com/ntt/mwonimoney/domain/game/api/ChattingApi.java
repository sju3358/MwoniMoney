package com.ntt.mwonimoney.domain.game.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.service.ChattingService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class ChattingApi {

	private final ChattingService chattingService;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping(value = "/balances/{balanceGameIdx}/chatting", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Chat> getChattingHistoryRequest(@PathVariable Long balanceGameIdx) {
		Flux<Chat> chatFlux = chattingService.getBalanceGameChattingHistory(balanceGameIdx);
		return chatFlux;
	}

	@PostMapping("/balances/{balanceGameIdx}/chatting")
	public Mono<Chat> postChatRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable Long balanceGameIdx,
		@RequestBody Chat chat) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		return chattingService.addChat(chat, memberUUID, balanceGameIdx);
	}
}
