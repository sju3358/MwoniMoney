package com.ntt.mwonimoney.domain.game.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.ntt.mwonimoney.domain.game.entity.Word;

public interface WordCloudRepository extends MongoRepository<Word, String> {

	@Query("{word : ?0}")
	Optional<Word> findWordByWord(String word);
}