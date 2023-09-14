package com.ntt.wannabee.domain.game.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;

import com.ntt.wannabee.domain.game.entity.Chat;

import reactor.core.publisher.Flux;

public interface ChattingRepository extends ReactiveMongoRepository<Chat, String> {
	
	@Tailable // 커서를 안닫고 계속 유지한다.
	@Query("{balanceGameIdx: ?0}")
	Flux<Chat> mFindByBalanceGameIdx(Long balanceGameIdx);
}
