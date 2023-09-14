package com.ntt.mwonimoney.domain.game.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;

import com.ntt.mwonimoney.domain.game.entity.Chat;
import com.ntt.mwonimoney.domain.game.entity.Word;

import reactor.core.publisher.Flux;

public interface WordCloudRepository extends ReactiveMongoRepository<Word, String> {

	@Tailable // 커서를 안닫고 계속 유지한다.
	@Query("{balanceGameIdx: ?0}")
	Flux<Word> mFindByBalanceGameIdx(Long balanceGameIdx);
}