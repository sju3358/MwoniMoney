package com.ntt.wannabee.domain.game.service;

@Service
@RequiredArgsConstructor
public class ChattingService {

	private final ChatRepository chatRepository;
	private final MemberRecordService memberRecordService;

	public Flux<Chat> getChatLog(Long bubble_number) {
		return chatRepository.mFindByBubbleNumber(bubble_number)
			.subscribeOn(Schedulers.boundedElastic());
	}

	public Mono<Chat> insertChat(Chat chat, Long member_number) {
		chat.setSender(member_number);
		chat.setCreatedAt(LocalDateTime.now());
		chat.setLevel(memberRecordService.getMemberLevel(member_number));

		return chatRepository.save(chat);
	}

}
