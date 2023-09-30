package com.ntt.mwonimoney.domain.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ntt.mwonimoney.domain.game.entity.Word;

public interface WordCloudRepository extends MongoRepository<Word, String> {

	List<Word> findWordsByBalanceGameIdx(Long balanceGameIdx);

	Optional<Word> findWordByWord(String word);
}