package com.ntt.wannabee.domain.game.repository;

public interface ChattingRepository extends ReactiveMongoRepository<Chat, String> {
	//    @Tailable // 커서를 안닫고 계속 유지한다.
	//    @Query("{sender: ?0, receiver: ?1}")
	//    Flux<ChatResponseDTO> mFindBySender(String sender, String receiver); // Flux(흐름) response를 유지하면서 데이터를 계속 흘려보내기@Tailable // 커서를 안닫고 계속 유지한다.

	@Tailable // 커서를 안닫고 계속 유지한다.
	@Query("{bubbleNumber: ?0}")
	Flux<Chat> mFindByBubbleNumber(Long bubbleNumber);
}
